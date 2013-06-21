/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super'],
    function ($, ui_super) {
        return function (options) {
            var that = Object.create(ui_super);

            /**
             * Core of the model
             * @type {Object}
             */
            that.attrs = {};

            /**
             * Initializes the model
             * @param {String} options Initial attributes
             * @return {model}
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