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

    test('fetch with custom options given upon instantiation', function () {

        bdd.GIVEN(viewCollectionSetUpWith, options1).WHEN(fetchCalledWith, undefined).THEN(ajaxCalledWith, options1).AND(ajaxSuccessIsCalled, options1);
    });

    test('fetch with custom options given upon call', function () {

        bdd.GIVEN(viewCollectionSetUpWith, null).WHEN(fetchCalledWith, options2).THEN(ajaxCalledWith, options2).AND(ajaxSuccessIsCalled, options2);
    });

    test('fetch with custom options given upon instantiation and with custom options given upon call', function () {

        bdd.GIVEN(viewCollectionSetUpWith, options1).WHEN(fetchCalledWith, options3).THEN(ajaxCalledWith, options3).AND(ajaxSuccessIsCalled, options3);
    });

    var options1 = {
            "url": "/foo/bar/",
            "contentType": "application/json",
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        },
        options2 = {
            "url": "/foo/bar/",
            "contentType": "application/json",
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        },
        options3 = {
            "url": "/foo/bar/",
            "contentType": "application/json",
            "ajaxSuccess": sinon.spy(),
            "ajaxError": sinon.spy()
        },
        initData = [1, 2, 3],
        resp = [4, 5, 6],
        ajaxSuccessIsCalled = function (options) {
            var callArg = options.ajaxSuccess.getCall(0).args[0];

            ok(options.ajaxSuccess.calledOnce, 'ajaxSuccess is called');
            ok(callArg, 'ajaxSuccess was called with parameter');
            ok(callArg.core, 'parameter is a collection');
            equal(JSON.stringify(callArg.core()), JSON.stringify(resp), '')
        },
        fetchCalledWith = function (options) {
            var inst = bdd.given;

            inst.fetch(options);

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
                equal(options[key], callArgs[key], 'Defaults ajax options are merged with give options');
            });
        }
});
