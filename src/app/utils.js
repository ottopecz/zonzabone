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
        }
    };
});