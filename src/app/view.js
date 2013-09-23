/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 * @require window.jQuery
 * @require window.Mustache
 * @require Zonzabone.ui_super
 */
/*global define, require*/
(function ($, mustache, Zonzabone) {
    "use strict";

    Zonzabone.view = function (options) {
        var that = Object.create(Zonzabone.ui_super());

        /**
         * jQuery wrapped dom element of the view
         * @type {jQuery}
         * @public
         */
        that.$el = (options && options.$el) ? options.$el : (options && options.el) ? $(options.el) : null;

        /**
         * The dom element of the view
         * @type {dom}
         */
        that.el = (options && options.el) ? options.el : (options && options.$el) ? options.$el.get(0) : null;

        /**
         * Css classes for the dom element of the view
         * @type {String}
         * @public
         */
        that.className = (options && options.className) ? options.className : null;

        /**
         * The viewModel of the view
         * @type {Object}
         * @public
         */
        that.viewModel = $.extend((options && options.viewModel) ? options.viewModel : {}, {
            "i18n": function () {
                return function (t) {
                    return t;
                };
            }
        });

        /**
         * Template of the view
         * @abstract
         * @type {String}
         */
        that.template = "";

        /**
         * Partial templates of the view
         * @type {Object.<string>}
         */
        that.partials = {};

        /**
         * Finds an element in the view
         * @param {String} selector Css selector to the target
         * @returns {jQuery}
         * @public
         */
        that.$ = function (selector) {
            return this.$el.find(selector);
        };

        /**
         * Renders the view
         * @returns {view}
         * @public
         */
        that.render = function () {
            this.$el.html(mustache.to_html(this.template, this.viewModel, this.partials));
            return this;
        };

        /**
         * Extends the vie with the passed object and re-renders the view
         * @param data {Object} New data to extend the viewModel
         * @public
         */
        that.refresh = function (data) {
            this.viewModel = $.extend(this.viewModel, data);
            this.render();
        };

        /**
         * Tears down the view
         * @public
         */
        that.teardown = function () {
            this.$el.remove();
            delete this.$el; // For proper garbage collection
            delete this.el; // For proper garbage collection
        };

        /**
         * Initializes the view
         * @returns {view}
         * @public
         */
        that.init = function () {
            this.el = this.el || this.$el ? this.$el.get(0) : null; // When the dom of the view is defined in the sub type

            this.$el = this.$el || this.el ? $(this.el) : null; // When the dom of the view is defined in the sub type

            if (this.className) { // When className is specified in the sub type
                this.$el.addClass(this.className);
            }

            // When the view is overridden in the sub type we need to do extend again to get i18n function
            // When there is no sub type we just repeat the action from above
            this.viewModel = $.extend(this.viewModel, {
                "i18n": function () {
                    return function (t) {
                        return t;
                    };
                }
            });

            return this;
        };

        return that.init();
    };
})(window.jQuery, (typeof define === "function" && define.amd) ? require('mustache') : window.Mustache, window.Zonzabone);