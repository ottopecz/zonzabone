/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define, setTimeout*/
define(['app/events', 'app/utils', 'jquery'],
    function (events, utils, $) {
        "use strict";

        return function () {
            var that = events();

            /**
             * Returns the object being up on the prototype chain
             * @returns {Object}
             */
            that.getProto = function () {
                return Object.getPrototypeOf(this);
            };

            return that;
        };
    }
);