/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 17/06/2013
 */
/*global window*/
(function (window) {
    "use strict";

    var that = Object.create({});

    that.GIVEN = function () {
        var args = Array.prototype.slice.call(arguments);

        this.plus = [];

        if (args.length === 1) {
            this.given = args[0].call(this);
        } else if (args.length === 2) {
            this.given = args[0].call(this, args[1]);
        } else if (args.length === 3) {
            this.given = args[0].call(this, args[1], args[2]);
        }
        return this;
    };

    that.PLUS = function () {
        var args = Array.prototype.slice.call(arguments);

        this.plus.push(args[0].call(this));
        return this;
    };

    that.WHEN = function () {
        var args = Array.prototype.slice.call(arguments);

        if (args.length === 1) {
            this.when = args[0].call(this);
        } else if (args.length === 2) {
            this.when = args[0].call(this, args[1]);
        } else if (args.length === 3) {
            this.when = args[0].call(this, args[1], args[2]);
        }

        return this;
    };

    that.THEN = function () {
        var args = Array.prototype.slice.call(arguments);

        if (args.length === 1) {
            args[0].call(this);
        } else if (args.length === 2) {
            args[0].call(this, args[1]);
        } else if (args.length === 3) {
            args[0].call(this, args[1], args[2]);
        }

        return this;
    };

    that.AND = function () {
        return this.THEN.apply(this, arguments);
    };

    window.bdd = that;
}(window));
