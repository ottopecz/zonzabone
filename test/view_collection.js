/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 27/11/2013
 */
/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var viewcollection  = require('zonzabone/view_collection'),
        utils           = require('zonzabone/utils'),
        bdd             = require('bdd');
    require('polyfills');
    require('sinon');
    require('mockjax');

    module('View Collection Tests', {
        "setup": function () {
            $.mockjax({
                "type": "GET",
                "url": "/foo/bar/",
                "contentType": "application/json",
                "responseText": JSON.stringify(resp)
            });

            sinon.spy($, 'ajax');
        },
        "teardown": function () {
            $.mockjaxClear();

            $.ajax.restore();
        }
    });

    test('Ajax success handler called on fetch when ajax options given upon instantiation', function () {

        bdd
            .GIVEN(viewCollectionSetUpWith, options1)
            .WHEN(fetchCalledWith, undefined)
            .THEN(ajaxCalledWith, options1)
            .AND(ajaxSuccessIsCalled, options1);
    });

    test('Extended reset called on fetch when inst extended', function () {

        bdd
            .GIVEN(extendedViewCollectionSetUpWith, options4)
            .WHEN(fetchCalledWith, undefined)
            .THEN(ajaxCalledWith, options4)
            .AND(extendedResetIsCalled);
    });

    test('Ajax success handler called on fetch when ajax options given upon call', function () {

        bdd
            .GIVEN(viewCollectionSetUpWith, null)
            .WHEN(fetchCalledWith, options2)
            .THEN(ajaxCalledWith, options2)
            .AND(ajaxSuccessIsCalled, options2);
    });

    test('Extended reset called on fetch when inst extended', function () {

        bdd
            .GIVEN(extendedViewCollectionSetUpWith, null)
            .WHEN(fetchCalledWith, options5)
            .THEN(ajaxCalledWith, options5)
            .AND(extendedResetIsCalled);
    });

    test('Ajax success handler called on fetch when ajax options given upon both instantiation and call', function () {

        bdd
            .GIVEN(viewCollectionSetUpWith, options1)
            .WHEN(fetchCalledWith, options3)
            .THEN(ajaxCalledWith, options3)
            .AND(ajaxSuccessIsCalled, options3);
    });

    test('Extended reset called on fetch when inst extended', function () {

        bdd
            .GIVEN(extendedViewCollectionSetUpWith, options6)
            .WHEN(fetchCalledWith, options6)
            .THEN(ajaxCalledWith, options6)
            .AND(extendedResetIsCalled);
    });

    var options = {
            "url": "/foo/bar/",
            "contentType": "application/json"
        },
        options1 = $.extend({}, options, {
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        }),
        options2 = $.extend({}, options, {
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        }),
        options3 = $.extend({}, options, {
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        }),
        options4 = $.extend({}, options, {
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        }),
        options5 = $.extend({}, options, {
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        }),
        options6 = $.extend({}, options, {
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        }),
        initData = [1, 2, 3],
        resp = [4, 5, 6],
        ajaxSuccessIsCalled = function (options) {
            var callArg = options.ajaxSuccess.getCall(0).args[0];

            ok(options.ajaxSuccess.calledOnce, 'ajaxSuccess is called');
            ok(callArg, 'ajaxSuccess was called with parameter');
            ok(callArg.ajaxOptions, 'parameter is a view collection');
            equal(JSON.stringify(callArg.core()), JSON.stringify(resp), 'ajaxSuccess was called with wrapped up resp');
        },
        fetchCalledWith = function (options) {
            var inst = bdd.given;

            inst.fetch(options);

            return inst;
        },
        extendedViewCollectionSetUpWith = function (options) {
            var inst = (function () {
                var that = Object.create(viewcollection(initData, options));

                that.reset = function (data) {
                    this.getProto().reset.bind(this)(data);
                };

                that.init = function (options) {
                    this.getProto().init.bind(this)(options);

                    return this;
                };

                return that.init(options);
            }());

            sinon.spy(inst, 'reset');

            return inst;
        },
        viewCollectionSetUpWith = function (options) {
            return viewcollection(initData, options);
        },
        ajaxCalledWith = function (options) {
            var inst = bdd.when,
                callArgs = $.ajax.getCall(0).args[0];

            deepEqual(inst.core(), resp);

            ok($.ajax.calledOnce, 'Fetch was called once');

            Object.keys(options).forEach(function (key) {
                equal(options[key], callArgs[key], 'Defaults ajax options are merged with given options');
            });
        },
        extendedResetIsCalled = function () {
            var inst = bdd.when;

            ok(inst.reset.calledOnce, 'Extended reset is called once');

            inst.reset.restore();
        };
});
