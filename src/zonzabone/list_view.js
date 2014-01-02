/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 27/11/2013
 */
define(function (require) {
    "use strict";

    var mustache        = require('mustache'),
        view            = require('zonzabone/view'),
        view_collection = require('zonzabone/view_collection');

    return function (options) {
        var that = Object.create(view(options));

        /**
         * Annihilates the viewModel of the super-type
         * @type {{}}
         * @public
         */
        that.viewModel = {};

        /**
         * The viewModel of the view
         * @type {Object}
         * @public
         */
        that.viewCollection = (options && options.viewCollection) ? options.viewCollection : view_collection();

        /**
         * Template of the view
         * @type {String}
         */
        that.template = (options && options.template) ? options.template : "{{#entries}}{{>entry}}{{/entries}}";

        /**
         * Partial templates of the view
         * @abstract
         * @type {Object.<string>}
         */
        that.partials = (options && options.partials) ? options.partials : {"entry": "replace me"};

        /**
         * Renders the view
         * @returns {view}
         * @public
         */
        that.render = function () {
            this.$el.html(mustache.to_html(this.template, {"entries": this.viewCollection.core()}, this.partials));
            return this;
        };

        /**
         * Extends the vie with the passed object and re-renders the view
         * @param data {Object} New data to extend the viewModel
         * @public
         */
        that.refresh = function (data) {
            data = (data && data.hasOwnProperty('core') && typeof data.core === 'function') ?
                data.core() : data;
            this.viewCollection.reset(data);
        };

        /**
         * Initializes the view
         * @returns {view}
         * @public
         */
        that.init = function () {
            this.el = (this.el && this.hasOwnProperty('el')) ?
                this.el :
                (this.$el ? this.$el.get(0) : null); // When the dom of the view is defined in the sub type

            this.$el = (this.$el && this.hasOwnProperty('$el')) ?
                this.$el :
                (this.el ? $(this.el) : null); // When the dom of the view is defined in the sub type

            if (this.className) { // When className is specified in the sub type
                this.$el.addClass(this.className);
            }
            this.viewCollection.off(); // If init is executed by the sub type all the handler needs to be removed which was added by the super type
            this.viewCollection.on('add reset remove', this.render, this);

            return this;
        };

        return that.init();
    };
});
