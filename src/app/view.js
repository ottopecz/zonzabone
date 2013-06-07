/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/events'],
    function ($, events) {
        return function (options) {
            var that = Object.create(events);

            that.el = options.el;

            that.$el = $(that.el);

            /**
             * @abstract
             * @type {Object}
             */
            that.viewModel = {};

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
             * @param {String} selector Css selector of the target
             * @return {jQuery.Object}
             */
            that.$ = function(selector) {
                return this.$el.find(selector);
            };

            /**
             * Renders the view
             * @return {Object}
             */
            that.render = function () {
                return this;
            };

            return that;
        };
    }
);