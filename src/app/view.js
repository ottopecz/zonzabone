/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super', 'mustache'],
    function ($, ui_super, mustache) {
        return function (options) {
            var that = Object.create(ui_super);

            that.$el = (options && options.el) ? $(options.el) : null;

            that.el = null;

            that.className = (options && options.className) ? options.className : null;

            /**
             * @abstract
             * @type {Object}
             */
            that.viewModel = {
                _: function () {
                    return function (t) {
                        return t;
                    };
                }
            };

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
             * @return {jQuery.Object}
             */
            that.$ = function (selector) {
                return this.$el.find(selector);
            };

            /**
             * Renders the view
             * @return {Object}
             */
            that.render = function () {
                this.$el.html(mustache.to_html(this.template, this.viewModel, this.partials));
                return this;
            };

            /**
             * Initializes the view
             * @param {String} options Initial arguments
             * @return {view}
             * @abstract
             */
            that.init = function (options) {
                if (this.className) {
                    this.$el.addClass(options.className);
                }

                this.el = this.$el ? this.$el.get(0) : null;

                return this;
            };

            return that.init(options);
        };
    }
);