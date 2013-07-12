/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/06/2013
 */
/*global define*/
define(
    ['jquery', 'app/ui_super', 'app/utils'],
    function ($, ui_super, utils) {
        return function (arr) {
            "use strict";

            var that = Object.create(ui_super());

            /**
             * Core of the collection
             * @type {Array}
             */
            that.arr = [];

            /**
             * Resets the collection
             */
            that.reset = function () {
                this.arr = [];

                return this;
            };

            /**
             * Returns the elements of the collection with given key
             * @param key {String} Key to values
             * @returns {Array.<object>} or {Object}
             */
            that.get = function (key) {
                var ret = [];

                this.arr.forEach(function (e) {
                    if (e[key]) {
                        ret.push(e[key]);
                    }
                });

                if (ret.length === 1) { ret = ret[0]; }

                return ret;
            };

            /**
             * Add new element(s) to the collection
             * @param elmnt {Array.<object>} or {Object}
             */
            that.add = function (toAdd) {
                if (utils.validObj(toAdd)) {
                    that.arr.push(toAdd);
                } else if (Object.prototype.toString.call(toAdd) === '[object Array]' && utils.arrOfObj(toAdd)) {
                    that.arr = that.arr.concat(toAdd);
                }
            };

            /**
             * Removes objects from the collection
             * @param {String} key Key of the element to be removed
             * @param {*} value Value of the element to be removed
             * @returns {Array} The array of the removed elements
             */
            that.removeWhere = function (key, value) {
                var ret = [];

                this.arr.forEach(function (e, i, arr) {
                    if (e[key] === value) {
                        ret = ret.concat(arr.splice(i, 1));
                    }
                });

                return ret;
            };

            /**
             * Returns the elements of the collection with given key and value
             * @param key {String} Key to find
             * @param value {*} Value to find
             * @returns {Array.<object>}
             */
            that.getWhere = function (key, value) {
                var ret = [];

                this.arr.forEach(function (e) {
                    if (e[key] === value) {
                        ret.push(e);
                    }
                });

                return ret;
            };

            /**
             * Proxies to Array.splice
             * @param i {Number} index to splice from
             * @param l {Number} length to splice with
             * @return {Array}
             */
            that.splice = function (i, l) {
                return this.arr.splice(i, l);
            };

            /**
             * Proxies to Array.forEach
             * @param callback {Function} Callback for forEach
             * @param ctx {Object} Context for callback
             */
            that.each = function (callback, ctx) {
                if (ctx) {
                    this.arr.forEach(callback, ctx);
                } else {
                    this.arr.forEach(callback);
                }
            };

            /**
             * Initializes the collection
             * @param {String} arr Initial elements
             * @returns {collection}
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