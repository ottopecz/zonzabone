/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define */
define(
    ['jquery', 'app/ui_super'],
    function ($, ui_super) {
        return function (options) {
            var that = Object.create(ui_super);

            that.attr = options.attr;

            return that;
        };
    }
);