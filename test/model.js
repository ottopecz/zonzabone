/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var model      = require('zonzabone/model'),
        bdd        = require('bdd');

    require('polyfills');

    module('Model Tests');

    test('set', function () {

        bdd.GIVEN(modelInstanceWithEventHandler, 'change:colour', changeHandler)
            .WHEN(setPropertyWith, 'colour', 'red')
            .THEN(eventIsTriggered, 'change:colour');
    });

    var modelInstance = function () {

            return model();
        },

        modelInstanceWithEventHandler = function (e, handler) {

            return modelInstance().on(e, handler);
        },

        changeHandler = function () {

            bdd.given.set('eventTriggered', true);
        },

        eventIsTriggered = function (e) {

            stop();

            setTimeout(function () {

                equal(bdd.given.get('eventTriggered'), true, 'Event is triggered on setting of property');

                start();

            }, 100);
        },

        setPropertyWith = function (property, val) {

            bdd.given.set(property, val);
        }
});