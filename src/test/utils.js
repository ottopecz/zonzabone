/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 26/07/2013
 */
/*global define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var app     = require('app'),
        utils   = require('app/utils'),
        data    = require('json!app_tests/json/utils.json');

    module('Utils Tests');

    test('validObj', function () {
        ok(utils.validObj({}), 'Should pass if the argument is a valid object');
        ok(!utils.validObj("foo"), 'Should fail if the argument is a string');
        ok(!utils.validObj(5), 'Should fail if the argument is a number');
        ok(!utils.validObj([]), 'Should fail if the argument is an array');
        ok(!utils.validObj(null), 'Should fail if the argument is null');
        ok(!utils.validObj(undefined), 'Should fail if the argument is undefined');
        ok(!utils.validObj(true), 'Should fail if the argument is a boolean');
        ok(!utils.validObj(function () {}), 'Should fail if the argument is a function');
    });

    test('arrOfObj', function () {
        ok(utils.arrOfObj([{}, {}]), 'Should pass if all the elements are valid objects');
        ok(!utils.arrOfObj(["foo", {}]), 'Should fail if an element is a string');
        ok(!utils.arrOfObj([5, {}]), 'Should fail if an element is a number');
        ok(!utils.arrOfObj([[], {}]), 'Should fail if an element is an array');
        ok(!utils.arrOfObj([null, {}]), 'Should fail if an element is null');
        ok(!utils.arrOfObj([undefined, {}]), 'Should fail if an element is undefined');
        ok(!utils.arrOfObj([true, {}]), 'Should fail if an element is a boolean');
        ok(!utils.arrOfObj([function () {}, {}]), 'Should fail if an element is a function');
    });

    test('without', function () {

        var comparator = function (prop) {

                return function (a, b) {

                    return a[prop] === b[prop];
                };
            },
            func = function (prop) {

                return utils.without(data.without.a, data.without.b, comparator(prop));
            };

        equal(func('colour').length, 1, 'There is only one object with a colour (red) not in collection b');
        equal(func('weight').length, 0, 'All the weights in a exist in b');
        equal(func('name').length, 2, 'Henrietta exists in a and b');
        equal(func('sides').length, 3, 'No sides match in a and b');
        equal(func('shape').length, 3, 'No shapes exist in a which exist in b');
    });
});