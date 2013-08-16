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
            that.arr = arr || [];

            /**
             * Resets the collection
             */
            that.reset = function () {
                this.arr = [];

                return this;
            };

            /**
             * Returns the element/s of the collection with given key
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
                    this.arr.push(toAdd);
                } else if (utils.arrOfObj(toAdd)) {
                    this.arr = this.arr.concat(toAdd);
                }
            };

            /**
             * Removes objects from the collection filtered by parameter
             * @param {Object} arguments Key value pairs to filter
             * or
             * @param {String} arguments[0] Key to filter
             * @param {*} arguments[1] Value to filter
             * @returns {Array} The array of the removed elements
             */
            that.removeWhere = function () {
                var arr = Array.prototype.slice.call(arguments), filters, ret;

                if (arr.length === 1 && utils.validObj(arr[0])) { // When multiple filters passed in an obj
                    filters = arr[0];
                } else if (arr.length === 2 && typeof arr[0] === 'string') { // When one key value pair passed not wrapped in obj
                    filters = {};
                    filters[arr[0]] = arr[1];
                } else { // Graceful fallback for bad parameters
                    return ret;
                }

                ret = this.arr.filter(function (elmnt, i, array) {
                    for (var key in filters) {
                        if (filters.hasOwnProperty(key) && (filters[key] !== elmnt[key])) { return false; }
                    }

                    array.splice(i, 1);
                    return true;
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
             * @param {Array.<object>} arr The initial list of objects
             * @returns {collection}
             * @abstract
             */
            that.init = function (arr) {

                return this;
            };

            return that.init(arr);
        };
    }
);