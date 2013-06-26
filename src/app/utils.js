/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 17/06/2013
 */
/*global define*/
define(['jquery'], function ($) {
    "use strict";

    return {
        shallowClone: function (obj) {
            return $.extend({}, obj);
        },
        deepClone: function (obj) {
            return $.extend(true, {}, obj);
        },
        /**
         * Returns the value of the session cookie given as parameter
         * @param {String} name The name of the cookie the value of wanted
         * @returns {String}
         */
        readCookie: function (name) {
            var nameEQ = name + "=",
                ca = document.cookie.split(';'),
                i, c;

            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
                if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
            }
            return null;
        }
    };
});