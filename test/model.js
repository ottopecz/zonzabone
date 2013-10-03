/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var model      = require('zonzabone/model'),
        bdd        = require('bdd');

    module('Model Tests');

    test('set', function () {

        bdd.GIVEN(modelInstanceWithEventHandler, 'change:colour', changeHandler)
            .WHEN(setPropertyWith, 'colour', 'red')
            .THEN(eventIsTriggered, 'change:colour');
    });

    test('set', function () {

        bdd.GIVEN(modelInstanceWithEventHandler, 'change:colour', changeHandler)
            .WHEN(setPropertyWith, 'size', 'big')
            .THEN(eventIsNotTriggered, 'change:colour');
    });

    test('set', function () {

        bdd.GIVEN(modelInstanceWithEventHandler, 'change:colour', changeHandler)
            .WHEN(handlerIsRemoved, 'change:colour')
            .AND(setPropertyWith, 'colour', 'red')
            .THEN(eventIsNotTriggered, 'change:colour');
    });

    var modelInstance = function () {

            return model();
        },

        modelInstanceWithEventHandler = function (e, handler) {

            return modelInstance().on(e, handler);
        },

        handlerIsRemoved = function (e) {

            bdd.given.off(e);
        },

        changeHandler = function () {

            bdd.given.set('eventTriggered', true);
        },

        eventIsNotTriggered = function (e) {

            stop();

            setTimeout(function () {

                notStrictEqual(bdd.given.get('eventTriggered'), true, 'Event is not triggered on setting of irrelevant property');

                start();

            }, 100);
        },

        eventIsTriggered = function (e) {

            stop();

            setTimeout(function () {

                strictEqual(bdd.given.get('eventTriggered'), true, 'Event is triggered on setting of property');

                start();

            }, 100);
        },

        setPropertyWith = function (property, val) {

            bdd.given.set(property, val);
        }
});