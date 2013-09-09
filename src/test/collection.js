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
        bdd.GIVEN(collInsWithMultipleElmnts).WHEN(setKeyTo, "value" ).THEN(keyChangedOnAllElmntsTo, "value");
    });

    var collInsWithMultipleElmnts = function () {
            return collection([{}, {}]);
        },
        setKeyTo = function (value) {
            return bdd.given.set("key", value);
        },
        keyChangedOnAllElmntsTo = function (value) {
            bdd.when.each(function (el) {
                equal(el.key, value, '');
            });
        };
});