/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super'],
    function ($, ui_super) {
        "use strict";

        return function (options) {
            var that = Object.create(ui_super);

            /**
             * Core of the model
             * @type {Object}
             */
            that.attrs = {};

            /**
             * Retrieves the value with the given key
             * @param {String} key The key of the wanted value
             * @return {*}
             */
            that.get = function (key) {
                return this.attrs[key];
            };

            /**
             * Sets the key with the given value
             * @param {String} key The key of the wanted value
             * @param {String} value The value for the key
             * @return {app.model}
             */
            that.set = function (key, value) {
                this.attrs[key] = value;

                return this;
            };

            /**
             * Initializes the model
             * @param {String} options Initial attributes
             * @return {app.model}
             * @abstract
             */
            that.init = function (options) {

                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        if (typeof options[key] !== 'function') {
                            this.attrs[key] = options[key];
                        } else {
                            this[key] = options[key];
                        }
                    }
                }

                return this;
            };

            return that.init(options);
        };
    }
);