/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 09/09/2013
 */
/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var collection  = require('zonzabone/collection'),
        utils       = require('zonzabone/utils'),
        bdd         = require('bdd');

    module('Collection Tests');

    test('set', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(setKeyTo, "custom value" ).THEN(keyChangedOnAllElmntsTo, "custom value");
    });

    test('set', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getWithKeyOf, "keyCommon" ).THEN(getReturns, getReturnData);
    });

    test('removeWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithObj, {"key3": "value3"}).THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithObj, {"key3": "value3", "keyCommon": "valueCommon"}).THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(removeWithKeyVal, "key3", "value3").THEN(collContains, [{"key1": "value1"}, {"key2": "value2", "keyCommon": "valueCommon"}]);
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndRemoveHandler, eventHandler).WHEN(removeWithObj, {"key3": "value3"}).THEN(removeEventIsTriggered);
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndRemoveHandler, eventHandler).WHEN(removeWithObj, {"key3": "value3"}).THEN(argumentsArePassedToRemoveHandler);
    });
    test('removeWhere', function () {
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndRemoveHandler, eventHandler).WHEN(removeWithObj, {"keyX": "valueX"}).THEN(removeEventIsNotTriggered);
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndRemoveHandler, eventHandler).WHEN(removeWithObj, null).THEN(removeEventIsNotTriggered);
    });

    test('getWhere', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getElmntsWithKeyVal, "key1", "value1").THEN(resultIs, [{"key1": "value1"}]);
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getElmntsWithKeyVal, "key3", "value4").THEN(resultIs, []);
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(getElmntsWithKeyVal, "keyCommon", "valueCommon").THEN(resultIs, [
            {"key2": "value2", "keyCommon": "valueCommon"},
            {"key3": "value3", "keyCommon": "valueCommon"}
        ]);
    });

    test('add', function () {
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(addNewElements, [{"key4": "value4"}]).THEN(collGrowsWith, [{"key4": "value4"}]);
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(addNewElements, [{"key4": "value4"}, {"key5": "value5"}]).THEN(collItemsHas, 5);
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(addNewElements, {"key4": "value4"}).THEN(collItemsHas, 4);
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndAddHandler, eventHandler).WHEN(addNewElements, [{"key4": "value4"}]).THEN(addEventIsTriggered);
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndAddHandler, eventHandler).WHEN(addNewElements, [{"key4": "value4"}]).THEN(argumentsArePassedToAddHandler);
    });

    test('add', function () {
        bdd.GIVEN(collectionInstanceWithMultipleElementsAndAddHandler, eventHandler).WHEN(addNewInvalidElements).THEN(addEventIsNotTriggered);
    });

    var data = [
            {"key1": "value1"},
            {"key2": "value2", "keyCommon": "valueCommon"},
            {"key3": "value3", "keyCommon": "valueCommon"}
        ],
        getReturnData = [
            {"key2": "value2", "keyCommon": "valueCommon"},
            {"key3": "value3", "keyCommon": "valueCommon"}
        ],
        getWithKeyOf = function (key) {
            var inst = bdd.given;

            return inst.getElements(key);
        },
        getReturns = function (expected) {
            var ret = bdd.when;

            deepEqual(ret, expected, 'The get method return the elements with the given key');
        },
        collInsWithMultipleElmnts = function () {
            return collection(utils.shallowClone(data));
        },
        collectionInstanceWithMultipleElementsAndAddHandler = function (handler) {
            var coll = collection(utils.shallowClone(data));
            coll.on('add', handler);
            return coll;
        },
        eventHandler = function () {
            bdd.given.argumentsPassed = Array.prototype.slice.call(arguments);
            bdd.given.eventTriggered = true;
        },
        collectionInstanceWithMultipleElementsAndRemoveHandler = function (handler) {
            var coll = collection(utils.shallowClone(data));
            coll.on('remove', handler);
            return coll;
        },
        removeWithKeyVal = function (key, value) {
            bdd.given.removeWhere(key, value);
            return bdd.given;
        },
        removeWithObj = function (obj) {
            bdd.given.removeWhere(obj);
            return bdd.given;
        },
        argumentsArePassedToRemoveHandler = function () {
            stop();
            setTimeout(function () {
                strictEqual(bdd.given.argumentsPassed.length, 3, 'The remove handler is passed 3 arguments');
                start();
            }, 100);
        },
        argumentsArePassedToAddHandler = function () {
            stop();
            setTimeout(function () {
                strictEqual(bdd.given.argumentsPassed.length, 2, 'The add handler is passed 3 arguments');
                start();
            }, 100);
        },
        collItemsHas = function (count) {
            equal(bdd.when.length(), count, 'The proper number of elements are added to the collection');
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
        },
        addNewElements = function (newElements) {
            return bdd.given.add(newElements);
        },
        addNewInvalidElements = function () {
            return bdd.given.add(null);
        },
        removeEventIsTriggered = function () {
            stop();
            setTimeout(function () {
                strictEqual(bdd.given.eventTriggered, true, 'Event is triggered on removal of item');
                start();
            }, 100);
        },
        removeEventIsNotTriggered = function () {
            stop();
            setTimeout(function () {
                notStrictEqual(bdd.given.eventTriggered, true, 'Event is not triggered on invalid removal of item');
                start();
            }, 100);
        },
        addEventIsTriggered = function () {
            stop();
            setTimeout(function () {
                strictEqual(bdd.given.eventTriggered, true, 'Event is triggered on addition of new item');
                start();
            }, 100);
        },
        addEventIsNotTriggered = function () {
            stop();
            setTimeout(function () {
                notStrictEqual(bdd.given.eventTriggered, true, 'Event is not triggered on addition of an invalid item');
                start();
            }, 100);
        },
        collGrowsWith = function (expElements) {
            equal(bdd.when.length(), data.length + expElements.length, '');
        };
});