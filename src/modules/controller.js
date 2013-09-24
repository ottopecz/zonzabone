/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 * @require window.jQuery
 * @require Zonzabone.ui_super
 * @require Zonzabone.view
 * @require Zonzabone.model
 */
/*global define, require*/
(function ($, Zonzabone) {
    "use strict";

    $.fn.extend({
        findClosest: function (sel) {
            var $ret = $(),
                $parent = this.parent(sel),
                $closest = this.parent().closest(sel);

            if ($parent.length) {
                $ret = $parent;
            } else if ($closest.length) {
                $ret = $closest;
            }

            return $ret;
        }
    });

    Zonzabone.controller = function (options) {
        /** ------- ---- */
        /** Private area */
        /** ------- ---- */

        var that = Object.create(Zonzabone.ui_super());

        /** ------ ---- */
        /** Public area */
        /** ------ ---- */

        /**
         * The options that the controller is created with
         * @type {Object}
         * @public
         */
        that.options = options;

        /**
         * Changes updates browser location bar and fires callback
         * @public
         */
        that.push = function (url, state) {
            window.history.pushState(state, null, url);
        };

        /**
         * Loads the sub blocks in the area of this block (Should be used only if this is a block controller)
         * @param {app.events} broker Reference to the global event dispatcher
         * @param parent {app.controller} Reference to the parent controller
         * @return {app.controller}
         * @public
         */
        that.loadBlocks = function (broker, parent) {
            var $el = parent ? $(parent.options.el) : $(document);

            $el.find('*[data-block]').each(function () {
                var $this = $(this), self, options;

                if (!$this.findClosest('*[data-block]').length || ($this.findClosest('*[data-block]').get(0) === $el.get(0))) {
                    self = this;
                    options = $this.data();

                    require([options.block], function (block_contr) {
                        options.el = self;

                        if (parent) { // When a block view instantiates the embeded block views.
                            options.parent = parent;
                            options.broker = broker || parent.options.broker;
                        } else if (broker) { // When a root block views get instantiated.
                            options.broker = broker;
                        } else { // Secure fallback. (This should not happen.)
                            options.broker = Object.create(Zonzabone.ui_super);
                        }
                        var block = block_contr(options);
                        options.broker.trigger('base:block_loaded');
                    });
                }
            });

            return this;
        };

        /**
         * Tears down the controller and its views
         * @public
         */
        that.teardown = function () {
            $(this.options.el).off();

            if (this.view.core() && Object.prototype.toString.call(this.view.core()) === '[object Array]' && this.view.length()) { // View is a collection of views
                this.view.forEach(function (view) {
                    view[Object.keys(view)[0]].teardown();
                });
            } else {
                this.view.teardown();
            }
        };

        /**
         * Initializes the controller
         * @abstract
         */
        that.init = function (options) {
            var key, match, event, selector, handler, ctx,
                modelOpts,
                eventSplitter = /^(\S+)\s*(.*)$/;

            // Creating basic view if that's not defined in the sub factory
            this.view = this.view || Zonzabone.view({ "el": options.el });

            // Creating a model for the controller if that's not defined in the sub factory
            if (options && !options.model && !this.model) { // When the controller is not initialized with any model (Should happen if the sub factory produces block controllers)
                modelOpts = $.extend({}, options);
                delete modelOpts.el;
                delete modelOpts.broker;
                delete modelOpts.block;

                this.model = Zonzabone.model(modelOpts);
            } else if (options && options.model && !this.model) { // When the controller is initialized with a model
                this.model = options.model;
            }

            // Delegating browser events. They are supposed to be declared in the sub factory
            if (this.events) {
                $(this.options.el).off();
                for (key in this.events) {
                    if (this.events.hasOwnProperty(key)) {
                        match = key.match(eventSplitter);
                        event = match[1];
                        selector = match[2];
                        handler = this.events[key].handler;
                        ctx = this.events[key].ctx;

                        if (selector === '') {
                            $(this.options.el).on(event, handler.bind(ctx));
                        } else {
                            $(this.options.el).on(event, selector, handler.bind(ctx));
                        }
                    }
                }
            }
        };

        return that;
    };
}(window.jQuery, window.Zonzabone));