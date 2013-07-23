/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super', 'mustache'],
    function ($, ui_super, mustache) {
        "use strict";

        return function (options) {
            var that = Object.create(ui_super());

            that.$el = (options && options.el) ? $(options.el) : null;

            that.el = null;

            that.className = (options && options.className) ? options.className : null;

            /**
             * @abstract
             * @type {Object}
             */
            that.viewModel = $.extend((options && options.viewModel) ? options.viewModel : {}, {
                _: function () {
                    return function (t) {
                        return t;
                    };
                }
            });

            /**
             * @abstract
             * @type {String}
             */
            that.template = "";

            /**
             * @abstract
             * @type {Object}
             */
            that.partials = {};

            /**
             * Finds an element in the view
             * @param {String} selector Css selector to the target
             * @returns {jQuery.Object}
             */
            that.$ = function (selector) {
                return this.$el.find(selector);
            };

            /**
             * Renders the view
             * @returns {Object}
             */
            that.render = function () {
                this.$el.html(mustache.to_html(this.template, this.viewModel, this.partials));
                return this;
            };

            that.refresh = function (data) {
                this.viewModel = $.extend(this.viewModel, data);
                this.render();
            };

            that.teardown = function () {
                this.$el.remove();
                delete this.$el;
                delete this.el;
            };

            /**
             * Initializes the view
             * @param {String} options Initial arguments
             * @returns {view}
             * @abstract
             */
            that.init = function (options) {
                if (this.className) {
                    this.$el.addClass(this.className);
                }

                this.el = this.$el ? this.$el.get(0) : null;

                return this;
            };

            return that.init(options);
        };
    }
);