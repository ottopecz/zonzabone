/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 14/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super', 'app/model', 'app/view', 'app/controller'],
    function ($, ui_super, model, view, controller) {
        "use strict";

        return {
            ui_super: ui_super,
            view: view,
            model: model,
            controller: controller
        };
    }
);