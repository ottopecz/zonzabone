/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 23/09/2013
 */
/*global define*/
define(function (require) {
    "use strict";

    return {
        "utils"             : require('zonzabone/utils'),
        "events"            : require('zonzabone/events'),
        "ui_super"          : require('zonzabone/ui_super'),
        "collection"        : require('zonzabone/collection'),
        "view_collection"   : require('zonzabone/view_collection'),
        "model"             : require('zonzabone/model'),
        "view"              : require('zonzabone/view'),
        "list_view"         : require('zonzabone/list_view'),
        "controller"        : require('zonzabone/controller')
    };
});