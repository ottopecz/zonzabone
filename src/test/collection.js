/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 09/09/2013
 */
/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var collection = require('zonzabone/collection');
        require('bdd');
        require('polyfills');


    module('Collection Tests');

    test('set', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(setKeyTo, "custom value" ).THEN(keyChangedOnAllElmntsTo, "custom value");
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithObj, {"key3": "value3"}).THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithObj, {"key3": "value3", "keyCommon": "valueCommon"}).THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithKeyVal, "key3", "value3").THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
    });

    test('getWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getElmntsWithKeyVal, "key1", "value1").THEN(resultIs, [{"key1": "value1"}]);
    });

    test('getWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getElmntsWithKeyVal, "key3", "value4").THEN(resultIs, []);
    });

    test('getWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getElmntsWithKeyVal, "keyCommon", "valueCommon").THEN(resultIs, [
            {"key2": "value2", "keyCommon": "valueCommon"},
            {"key3": "value3", "keyCommon": "valueCommon"}
        ]);
    });

    var collInsWithMultipleElmnts = function () {
            return collection([
                {"key1": "value1"},
                {"key2": "value2", "keyCommon": "valueCommon"},
                {"key3": "value3", "keyCommon": "valueCommon"}
            ]);
        },
        removeWithKeyVal = function (key, value) {
            bdd.given.removeWhere(key, value);
            return bdd.given;
        },
        removeWithObj = function (obj) {
            bdd.given.removeWhere(obj);
            return bdd.given;
        },
        collContains = function (arr) {
            equal(bdd.when.length(), arr.length, 'The proper number of elements was removed from the collection');
            equal(JSON.stringify(bdd.when.core()), JSON.stringify(arr), 'Loose check if the expected and results are the same');
        },
        setKeyTo = function (value) {
            return bdd.given.set("keyCustom", value);
        },
        keyChangedOnAllElmntsTo = function (value) {
            bdd.when.forEach(function (el) {
                equal(el.keyCustom, value, 'The key has changed on every element of collection');
            });
        },
        getElmntsWithKeyVal = function (key, value) {
            return bdd.given.getWhere(key, value);
        },
        resultIs = function (expResult) {
            equal(bdd.when.length, expResult.length, 'The result has one element');
            ok(bdd.when.constructor === Array, 'The result is an array');
            Object.keys(expResult).forEach(function (e) {
                deepEqual(bdd.when[e], expResult[e], 'The value with the given key is returned');
                ok(Object.keys(bdd.when)[e], 'The result has a key like specified in the arguments');
            });
        };
});