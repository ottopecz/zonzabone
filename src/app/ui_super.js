/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define, setTimeout*/
define(['app/events', 'app/utils', 'jquery'],
    function (events, utils, $) {
        "use strict";

        var that = utils.shallowClone(events);

        /**
         * Returns the object being up on the prototype chain
         * @return {Object}
         */
        that.getProto = function () {
            return Object.getPrototypeOf(this);
        };

        return that;
    }
);