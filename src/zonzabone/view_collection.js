/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 27/11/2013
 */
/*global define*/
define(function (require) {
    "use strict";

    var collection  = require('zonzabone/collection'),
        utils       = require('zonzabone/utils'),
        $           = require('jquery');

    return function (arr, options) {
        var that = Object.create(collection(arr)),

            /**
             * The default ajax parameters
             * @type {{type: string, success: Function}}
             * @private
             */
            _ajaxDefaults = {
                "type": "GET",
                "success": function (data) {
                    that.reset(data);
                }
            },

            /**
             * Extends the ajax defaults
             * @param {Object} source The something to extend
             * @param {Objects} withThis The something to extend with
             * @returns {Object}
             * @private
             */
            _extend = function (source, withThis) {
                var ret = source;

                if (withThis) {
                    ret = $.extend(Object.create(source), withThis, {
                        "success": function (data) {

                            _ajaxDefaults.success(data);

                            if (withThis.ajaxSuccess && utils.executable(withThis.ajaxSuccess)) {
                                withThis.ajaxSuccess(data);
                            }
                        },
                        "error": function () {

                            if (withThis.ajaxError && utils.executable(withThis.ajaxError)) {
                                withThis.ajaxError(arguments);
                            }
                        }
                    });
                }

                return ret;
            };

        /**
         * The parameters of the fetch call
         * @type {Object}
         * @public
         */
        that.ajaxOptions = null;

        /**
         * Fetches data from the server
         * @param {Object} ajaxOptions Options for the request
         */
        that.fetch = function (ajaxOptions) {
            if (ajaxOptions) {
                this.ajaxOptions = _extend(_ajaxDefaults, ajaxOptions);
            }

            $.ajax(this.ajaxOptions);
        };

        that.init = function (options) {

            this.ajaxOptions = _extend(_ajaxDefaults, options);

            return this;
        };

        return that.init(options);
    };
});
