/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 17/06/2013
 */
/*global define*/
define(['jquery'], function ($) {
    "use strict";

    var that = {};

    /**
     * Shortcut to shallow clone an object
     * @param obj {Object} Object to clone
     * @returns {Object}
     */
    that.shallowClone = function (obj) {
        return $.extend({}, obj);
    };

    /**
     * Shortcut to deep clone an object
     * @param obj {Object} Object to clone
     * @returns {Object}
     */
    that.deepClone = function (obj) {
        return $.extend(true, {}, obj);
    };

    /**
     * Returns the value of the session cookie given as parameter
     * @param {String} name The name of the cookie the value of wanted
     * @returns {String}
     */
    that.readCookie = function (name) {
        var nameEQ = name + "=",
            ca = document.cookie.split(';'),
            i, c;

        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
            if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
        }
        return null;
    };

    /**
     * Returns true if valid object (array, function or null not wanted)
     * @param elmnt {Object} Object to find out about
     * @returns {Boolean}
     */
    that.validObj = function (elmnt) {
        return (!!elmnt) && (elmnt.constructor === Object);
    };

    /**
     * Returns true if array of valid objects (elements are not array, function or null)
     * @param arr {Array} Array to find out about
     * @returns {Boolean}
     */
    that.arrOfObj = function (arr) {
        var i;

        if (Object.prototype.toString.call(arr) !== '[object Array]') { // This is not an array so quit with false
            return false;
        } else {
            for (i = 0; i < arr.length; i++) {
                if (!this.validObj(arr[i])) {
                    return false; // This member is not a valid object so quit with false
                }
            }
        }

        return true;
    };

    /**
     * Makes dashed strings camel-case
     * @param {String} str String to camel-case
     * @return {String}
     */
    that.camelCase = function (str) {
        return (str || '').toLowerCase().replace(/(\b|-)\w/g, function (m) {
            return m.toUpperCase().replace(/-/, '');
        });
    };

    /**
     * Get new array of all items in a and not in b
     * Relative complement of B in A
     * See http://en.wikipedia.org/wiki/Naive_set_theory#Unions.2C_intersections.2C_and_relative_complements
     * @param {Array.<object>} a Array of objects to filter
     * @param {Array.<object>} b Array of objects to filter from A
     * @param {Function} func Comparator function to determine object match
     * @returns {Array.<object>}
     */
    that.without = function (a, b, func) {
        var x, y, l, m, c = [];
        outer:
        for (x = 0, l = a.length; x < l; x++) {
            inner:
            for (y = 0, m = b.length; y < m; y++) {
                if (func(a[x], b[y])) {
                    continue outer;
                }
            }
            c.push(a[x]);
        }
        return c;
    };

    return that;
});