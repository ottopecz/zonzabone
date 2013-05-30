/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define */
define(
    ['jquery', 'app/events'],
    function ($, events) {
        return function (options) {
            var that = Object.create(events);

            that.attr = options.attr;

            return that;
        };
    }
);