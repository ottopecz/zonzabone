/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super', 'app/collection', 'app/utils'],
    function ($, ui_super, collection, utils) {
        "use strict";

        return function (options) {
            var that = Object.create(ui_super);

            /**
             * Core of the model
             * @type {Object}
             */
            that.attributes = {};

            /**
             * Retrieves the value with the given key
             * @param {String} key The key of the wanted value
             * @returns {*}
             */
            that.get = function (key) {
                return this.attributes[key];
            };

            /**
             * Sets the key with the given value
             * @param {String} key The key of the wanted value
             * @param {String} value The value for the key
             * @returns {app.model}
             */
            that.set = function (key, value) {
                this.attributes[key] = value;

                return this;
            };

            /**
             * Initializes the model
             * @param {String} options Initial attributes
             * @returns {app.model}
             * @abstract
             */
            that.init = function (options) {

                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        if (typeof options[key] === 'function') {
                            this[key] = options[key];
                        } else if (Object.prototype.toString.call(options[key]) === '[object Array]' && utils.arrOfObj(options[key])) {
                            this.attributes[key] = collection(options[key]);
                        } else {
                            this.attributes[key] = options[key];
                        }
                    }
                }

                return this;
            };

            return that.init(options);
        };
    }
);