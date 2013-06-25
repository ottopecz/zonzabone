/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/06/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super'],
    function ($, ui_super) {
        return function (arr) {
            "use strict";

            var that = Object.create(ui_super);

            that.arr = [];

            that.get = function (key) {
                var ret = [];

                this.arr.forEach(function (e) {
                    if (e[key]) {
                        ret.push(e[key]);
                    }
                });

                return ret;
            };

            that.add = function (elmnt) {
                that.arr.push(elmnt);
            };

            that.getWhere = function (key, value) {
                var ret = [];

                this.arr.forEach(function (e) {
                    if (e[key] === value) {
                        ret.push(e);
                    }
                });

                return ret;
            };

            that.splice = function (i, l) {
                return this.arr.splice(i, l);
            };

            that.each = function (callback, ctx) {
                if (ctx) {
                    return this.arr.forEach(callback, ctx);
                } else {
                    return this.arr.forEach(callback);
                }
            };

            /**
             * Initializes the collection
             * @param {String} arr Initial elements
             * @return {collection}
             * @abstract
             */
            that.init = function (arr) {

                if (arr) {
                    arr.forEach(function (elmnt) {
                        this.arr.push(elmnt);
                    }, this);
                }

                return this;
            };

            return that.init(arr);
        };
    }
);