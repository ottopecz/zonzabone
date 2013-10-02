/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 26/07/2013
 * @require window.Zonzabone
 */
/*global define, window, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var utils   = require('zonzabone/utils'),
        data = {
            "without": {

                "a": [
                    {
                        "shape": "square",
                        "colour": "pink",
                        "sides": 4,
                        "name": "jeremiah",
                        "weight": 70
                    },
                    {
                        "shape": "circle",
                        "colour": "red",
                        "sides": 1,
                        "name": "henrietta",
                        "weight": 80
                    },
                    {
                        "shape": "triangle",
                        "colour": "green",
                        "sides": 3,
                        "name": "joan",
                        "weight": 80
                    }
                ],
                "b": [
                    {
                        "shape": "dodecahedron",
                        "colour": "pink",
                        "sides": 10,
                        "name": "kevin",
                        "weight": 70
                    },
                    {
                        "shape": "pentagon",
                        "colour": "green",
                        "sides": 5,
                        "name": "henrietta",
                        "weight": 80
                    }
                ],
                "c": [

                ]
            }
        };

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

    test('shallowClone', function () {
        var data,
            clone,
            doAssertionsWhenDataObj = function () {
                var keys = Object.keys(data);

                equal(Object.keys(clone).length, Object.keys(data).length);

                keys.forEach(function (e) {
                    ok(clone[e], 'The clone has every key what the source had');
                    equal(clone[e], data[e], 'The value of the keys are the same like in the source');
                });
            },
            doAssertionsWhenDataArr = function () {
                equal(clone.length, data.length);

                data.forEach(function (obj, i) {
                    var keys = Object.keys(obj);

                    keys.forEach(function (e) {
                        ok(clone[i][e], 'The clone has every key what the source had');
                        equal(clone[i][e], obj[e], 'The value of the keys are the same like in the source');
                    });
                });
            };

        data = {}; clone = utils.shallowClone(data);
        doAssertionsWhenDataObj();

        data = {"key1": "value1"}; clone = utils.shallowClone(data);
        doAssertionsWhenDataObj();

        data = {"key1": "value1", "key2": "value2"}; clone = utils.shallowClone(data);
        doAssertionsWhenDataObj();

        data = []; clone = utils.shallowClone(data);
        doAssertionsWhenDataArr();

        data = [{"key1": "value1"}]; clone = utils.shallowClone(data);
        doAssertionsWhenDataArr();

        data = [{"key1": "value1"}, {"key2": "value2"}]; clone = utils.shallowClone(data);
        doAssertionsWhenDataArr();
    });
});