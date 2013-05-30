/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 14/05/2013
 */
/*global define*/
define(
    ['jquery', 'app/events', 'app/model', 'app/view', 'app/controller'],
    function ($, events, model, view, controller) {
        "use strict";

        return {
            events: events,
            view: view,
            model: model,
            controller: controller
        };
    }
);