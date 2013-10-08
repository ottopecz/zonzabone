/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/06/2013
 */
/*global define*/
define(function (require) {
    "use strict";

    var ui_super    = require('zonzabone/ui_super'),
        utils       = require('zonzabone/utils');

    return function (arr) {
        var that = Object.create(ui_super()),

        /**
         * Core of the collection
         * @type {Array}
         * @public
         */
        _arr = arr || [];

        /**
         * Resets the collection
         * @param {Array} arr The new core of the collection
         * @returns {collection}
         * @public
         */
        that.reset = function (arr) {
            _arr = arr || [];

            return this;
        };

        /**
         * Returns the length of the collection
         * @returns {Number} the length of the collection
         * @public
         */
        that.length = function () {

            return _arr.length;
        };

        /**
         * Returns the core array of the collection
         * @return {Array}
         * @public
         */
        that.core = function () {

            return _arr;
        };

        /**
         * Returns the element/s of the collection with given key
         * @param key {String} Key to values
         * @returns {Array.<object>} or {Object}
         * @public
         */
        that.get = function (key) {
            var ret = [];

            _arr.forEach(function (e) {
                if (e[key]) {
                    ret.push(e[key]);
                }
            });

            if (ret.length === 1) { ret = ret[0]; }

            return ret;
        };

        /**
         * Sets the given key value pair on all the elements in the collection
         * @param {String} key The property to set
         * @param {String} value The value to which the property has to set
         * @return {collection}
         * @public
         */
        that.set = function (key, value) {
            _arr.forEach(function (e) {
                e[key] = value;
            });

            return this;
        };

        /**
         * Add new element(s) to the collection
         * @param elmnt {Array.<object>} or {Object}
         * @public
         */
        that.add = function (toAdd) {
            var isAdded = false;

            if (isAdded = utils.validObj(toAdd)) {
                _arr.push(toAdd);
            } else if (isAdded = utils.arrOfObj(toAdd)) {
                _arr = _arr.concat(toAdd);
            }

            if (isAdded) {
                that.trigger('add');
            }

            return this;
        };

        /**
         * Removes objects from the collection filtered by parameter/s
         * @param {Object} arguments Key value pairs to filter
         * or
         * @param {String} arguments[0] Key to filter
         * @param {*} arguments[1] Value to filter
         * @returns {Array} The array of the removed elements
         * @public
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

            ret = _arr.filter(function (elmnt, i, array) {
                for (var key in filters) {
                    if (filters.hasOwnProperty(key) && (filters[key] !== elmnt[key])) { return false; }
                }

                array.splice(i, 1);
                return true;
            });

            if (ret.length) {
                that.trigger('remove');
            }

            return ret;
        };

        /**
         * Returns the elements of the collection with given key and value
         * @param key {String} Key to find
         * @param value {*} Value to find
         * @returns {Array.<object>}
         * @public
         */
        that.getWhere = function (key, value) {
            var ret = [];

            _arr.forEach(function (e) {
                if (e[key] === value) {
                    ret.push(e);
                }
            });

            return ret;
        };

        /**
         * Get new array of all items in this collection and not in b
         * Relative complement of B in A
         * See http://en.wikipedia.org/wiki/Naive_set_theory#Unions.2C_intersections.2C_and_relative_complements
         * @param {Array.<object>} b collection, containing objects to filter from collection
         * @param {Function} func Comparator function to determine object match
         * @returns {Array.<object>}
         * @public
         */
        that.without = function (b, func) {

            return utils.without(_arr, b.core(), func);
        };

        /**
         * Proxying to the native methods
         */
        ['forEach', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice', 'filter', 'map'].forEach(function (name) {
            that[name] = function () {
                return Array.prototype[name].apply(_arr, arguments);
            };
        }, that);

        return that;
    };
});
