/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 09/09/2013
 */
/*global define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var collection = require('app/collection'),
        bdd = require('bdd');

    module('Collection Tests');

    test('set', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(setKeyTo, "custom value" ).THEN(keyChangedOnAllElmntsTo, "custom value");
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithParsAsObj, {"key3": "value3"}).THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithParsAsObj, {"key3": "value3", "keyCommon": "valueCommon"}).THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithParsAsKeyVal, "key3", "value3").THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
    });

    var collInsWithMultipleElmnts = function () {
            return collection([{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}, {"key3": "value3", "keyCommon": "valueCommon"}]);
        },
        removeWithParsAsKeyVal = function (key, value) {
            bdd.given.removeWhere(key, value);
            return bdd.given;
        },
        removeWithParsAsObj = function (obj) {
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
                equal(el.keyCustom, value, '');
            });
        };
});