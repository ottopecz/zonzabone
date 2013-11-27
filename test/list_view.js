/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 27/11/2013
 */
/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var list_view       = require('zonzabone/list_view'),
        view_collection = require('zonzabone/view_collection'),
        bdd             = require('bdd');

    module('List View Tests', {
        "setup": function () {
            $('#qunit-fixture').html('<ul class="list-view"></ul>');
        },
        "teardown": function () {
            $('#qunit-fixture').empty();
        }
    });

    test('List view instantiates properly if viewCollection is passed to the factory', function () {

        bdd.GIVEN(defaultListViewFactory).WHEN(listViewInstantiatesWith, customViewData, customPartials).THEN(instHasToHave, customViewData, customPartials);
    });

    test('List view instantiates properly if viewCollection is defined the custom list view type', function () {

        bdd.GIVEN(customListViewFactoryWith, customViewData, customPartials).WHEN(listViewInstantiatesWith, undefined).THEN(instHasToHave, customViewData, customPartials);
    });

    test('List view renders properly if a viewCollection is passed to the factory', function () {

        bdd.GIVEN(defaultListViewInstWith, customViewData, customPartials).WHEN(instRenders).THEN(instUpdatesDomWith, customViewData.length);
    });

    test('List view renders properly if viewCollection is defined in the custom list view type', function () {

        bdd.GIVEN(customListViewInstCreatedWith, customViewData, customPartials).WHEN(instRenders).THEN(instUpdatesDomWith, customViewData.length);
    });

    asyncTest('List view renders properly when the elements added to the viewCollection if a viewCollection is defined in the custom list view type', function () {

        bdd.GIVEN(customListViewInstCreatedWith, customViewData, customPartials).THEN(asyncInstUpdatesDomWith, customViewData.length + addition.length).WHEN(elementsAddedToTheViewCollection, addition);
    });

    asyncTest('List view renders properly when the viewCollection gets reset if a viewCollection is defined in the custom list view type', function () {

        bdd.GIVEN(customListViewInstCreatedWith, customViewData, customPartials).THEN(asyncInstUpdatesDomWith, 0).WHEN(viewCollectionGetsReset);
    });

    asyncTest('List view renders properly when elements gets removed from the viewCollection if a viewCollection is defined in the custom list view type', function () {

        bdd.GIVEN(customListViewInstCreatedWith, customViewData, customPartials).THEN(asyncInstUpdatesDomWith, customViewData.length - 1).WHEN(oneElementRemoved);
    });

    var ctx = $('#qunit-fixture').get(0),
        customViewData = [{"foo": "bar1"}, {"foo": "bar2"}],
        customPartials = {"entry": "<li>{{foo}}</li>"},
        addition = [{"foo": "bar3"}, {"foo": "bar4"}],
        oneElementRemoved = function () {
            var inst = bdd.given;

            inst.render();

            inst.viewCollection.removeWhere({"foo": "bar1"});

            return inst;
        },
        viewCollectionGetsReset = function () {
            var inst = bdd.given;

            inst.render();

            inst.viewCollection.reset();

            return inst;
        },
        asyncInstUpdatesDomWith = function (length) {
            var inst = bdd.when,
                callback = function () {
                    equal(inst.$el.children().length, length, 'DOM updated');

                    inst.viewCollection.off('add reset remove', callback);
                    start();
                };

            inst.viewCollection.on('add reset remove', callback);
        },
        elementsAddedToTheViewCollection = function (addition) {
            var inst = bdd.given;

            inst.render();

            inst.viewCollection.add(addition);

            return inst;
        },
        customListViewInstCreatedWith = function (customViewData, customPartials) {
            var factory = customListViewFactoryWith(customViewData, customPartials),
                inst = factory();

            return inst.render();
        },
        instUpdatesDomWith = function (length) {
            var inst = bdd.when;

            equal(inst.$el.children().length, length, 'DOM updated');
        },
        instRenders = function () {
            var inst = bdd.given;

            return inst.render();
        },
        defaultListViewInstWith = function (customViewData, customPartials) {
            return list_view({
                "viewCollection": view_collection(customViewData),
                "partials": customPartials,
                "el": $('.list-view', ctx).get(0)
            });
        },
        defaultListViewFactory = function () {
            return list_view;
        },
        customListViewFactoryWith = function (customViewData, customPartials) {
            return function () {
                var that = Object.create(list_view());

                that.viewCollection = view_collection(customViewData);

                that.partials = customPartials;

                that.el = $('.list-view', ctx).get(0);

                that.init = function () {
                    this.getProto().init.bind(this)();

                    return this;
                };

                return that.init();
            };
        },
        listViewInstantiatesWith = function (customViewData, customPartials) {
            var factory = bdd.given;

            return factory({
                "viewCollection": view_collection(customViewData),
                "partials": customPartials
            });
        },
        instHasToHave = function () {
            var inst = bdd.when;

            ok(inst.viewCollection, 'Instance has a view collection');
            deepEqual(inst.viewCollection.core(), customViewData, 'view collection is that what was passed either as parameter or specified in the custom class');
            deepEqual(inst.partials, customPartials, 'view collection is that what was passed either as parameter or specified in the custom class');
        };
});