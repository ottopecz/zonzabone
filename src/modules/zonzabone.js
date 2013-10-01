/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 23/09/2013
 */
/*global define*/
define(function (require) {
    "use strict";

    return {
        "utils"       : require('utils'),
        "events"      : require('events'),
        "ui_super"    : require('ui_super'),
        "collection"  : require('collection'),
        "model"       : require('model'),
        "view"        : require('view'),
        "controller"  : require('controller')
    };
});