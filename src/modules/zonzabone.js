/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 23/09/2013
 */
/*global define*/
(function (window) {
    "use strict";

    window.Zonzabone = {};

    if (typeof define === "function" && define.amd) {
        define("zonzabone", [], function () { return window.Zonzabone; });
    }
}(window));