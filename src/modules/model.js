/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 * @require window.jQuery
 * @require Zonzabone.ui_super
 * @require Zonzabone.collection
 * @require Zonzabone.utils
 */
(function ($, Zonzabone) {
    "use strict";

    Zonzabone.model = function (options) {
        var that = Object.create(Zonzabone.ui_super()),

        /**
         * Core of the model
         * @type {Object}
         */
        _attributes = {};

        /**
         * Retrieves the value with the given key
         * @param {String} key The key of the wanted value
         * @returns {*}
         */
        that.get = function (key) {
            return _attributes[key];
        };

        /**
         * Sets the key with the given value
         * @param {String} key The key of the wanted value
         * @param {String} value The value for the key
         * @returns {app.model}
         */
        that.set = function (key, value) {
            _attributes[key] = value;

            return this;
        };

        /**
         * Reurns the core of the model
         * @return {Object}
         * @public
         */
        that.core = function () {
            return _attributes;
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
                    if (typeof options[key] === 'function') { // Option is a function
                        this[key] = options[key];
                    } else if (Zonzabone.utils.arrOfObj(options[key])) { // Option is an array populated by valid objects
                        _attributes[key] = Zonzabone.collection(options[key]);
                    } else { // Fallback
                        _attributes[key] = options[key];
                    }
                }
            }

            return this;
        };

        return that.init(options);
    };
}(window.jQuery, window.Zonzabone));