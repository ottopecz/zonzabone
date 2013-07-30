/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define, require*/
define(
    ['jquery', 'app/ui_super', 'app/view', 'app/model', 'jq/fn.find_closest'],
    function ($, ui_super, view, model) {
        "use strict";

        return function (options) {
            var that = Object.create(ui_super());

            that.options = options;

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
                                options.broker = Object.create(ui_super);
                            }
                            var block = block_contr(options);
                        });
                    }
                });

                return this;
            };

            that.teardown = function () {
                $(this.options.el).off();

                if (this.view.arr && Object.prototype.toString.call(this.view.arr) === '[object Array]' && this.view.arr.length) { // View is a collection of views
                    this.view.each(function (view) {
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

                this.view = this.view || view({ "el": options.el });

                if (!options.model && !this.model) { // When the controller is not initialized with any model

                    modelOpts = $.extend({}, options);
                    delete modelOpts.el;
                    delete modelOpts.broker;
                    delete modelOpts.block;

                    this.model = model(modelOpts);
                } else if (options.model && !this.model) { // When the controller has a custom model type
                    this.model = options.model;
                }

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
    }
);