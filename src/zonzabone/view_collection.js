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
             * Extends the ajax defaults
             * @param {Object} withThis The something to extend with
             * @param {Object} ctx The something to extend
             * @returns {Object}
             * @private
             */
            _extend = function (withThis, ctx) {
                var ret = $.extend(true, {}, ctx.ajaxDefaults);

                if (withThis) {
                    ret = $.extend(ret, withThis, {
                        "success": function (data) {
                            ctx.ajaxDefaults.success(data);

                            if (this.ajaxOptions.ajaxSuccess && utils.executable(this.ajaxOptions.ajaxSuccess)) {
                                this.ajaxOptions.ajaxSuccess(ctx);
                            }
                        }.bind(ctx),
                        "error": function () {

                            if (this.ajaxOptions.ajaxError && utils.executable(this.ajaxOptions.ajaxError)) {
                                this.ajaxOptions.ajaxError(arguments);
                            }
                        }.bind(ctx)
                    });
                }

                return ret;
            };

        /**
         * The default ajax parameters
         * @type {{type: string, success: Function}}
         * @public
         */
        that.ajaxDefaults = null;

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
                this.ajaxOptions = _extend(ajaxOptions, this);
            }

            $.ajax(this.ajaxOptions);
        };

        that.init = function (options) {

            this.ajaxDefaults = {
                "type": "GET",
                "success": function (data) {
                    this.reset(data);
                }.bind(this)
            };

            this.ajaxOptions = _extend(options, this);

            return this;
        };

        return that.init(options);
    };
});
