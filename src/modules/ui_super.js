/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 * @require Zonzabone.events
 */
(function (Zonzabone) {
    "use strict";

    Zonzabone.ui_super = function () {
        var that = Zonzabone.events();

        /**
         * Returns the object being up on the prototype chain
         * @returns {Object}
         */
        that.getProto = function () {
            return Object.getPrototypeOf(this);
        };

        return that;
    };
}(window.Zonzabone));