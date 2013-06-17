/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 14/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super', 'app/events', 'app/utils', 'app/model', 'app/view', 'app/controller'],
    function ($, ui_super, events, utils, model, view, controller) {
        "use strict";

        return {
            ui_super: ui_super,
            events: events,
            utils: utils,
            view: view,
            model: model,
            controller: controller
        };
    }
);