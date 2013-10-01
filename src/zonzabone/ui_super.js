/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(function (require) {
    "use strict";

    var events = require('zonzabone/events');

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
});