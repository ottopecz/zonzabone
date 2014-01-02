/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var view 	= require('zonzabone/view'),
        model   = require('zonzabone/model'),
        bdd     = require('bdd');

    module('View Tests');

    test('el of view can be overridden in sub-type', function () {

        bdd
            .GIVEN(subTypeCreatedFromSuperWithDOM, view, domELSub)
            .WHEN(subTypeInstantiates)
            .THEN(viewInstElIs, domELSub)
            .AND(viewInst$ElIs, $(domELSub));
    });

    test('el of view can be overridden in sub-type even though the super type has el already', function () {

        bdd
            .GIVEN(subTypeCreatedFromSuperWithDOM, super_view, domELSuper)
            .WHEN(subTypeInstantiates)
            .THEN(viewInstElIs, domELSuper)
            .AND(viewInst$ElIs, $(domELSuper));
    });

    test('$el of view can be overridden in sub-type', function () {

        bdd
            .GIVEN(subTypeCreatedFromSuperWithjQuery, view, $domELSub)
            .WHEN(subTypeInstantiates)
            .THEN(viewInstElIs, $domELSub.get(0))
            .AND(viewInst$ElIs, $domELSub);
    });

    test('$el of view can be overridden in sub-type even though the super type has $el already', function () {

        bdd
            .GIVEN(subTypeCreatedFromSuperWithjQuery, super_view, $domELSuper)
            .WHEN(subTypeInstantiates)
            .THEN(viewInstElIs, $domELSuper.get(0))
            .AND(viewInst$ElIs, $domELSuper);
    });

    test('view can be initialized with a dom element', function () {

        bdd
            .GIVEN(aViewType)
            .WHEN(anInstCreatedWith, {"el": domELSub})
            .THEN(viewInstElIs, domELSub)
            .AND(viewInst$ElIs, $(domELSub));
    });

    test('view can be initialized with a jquery wrapped dom element', function () {

        bdd
            .GIVEN(aViewType)
            .WHEN(anInstCreatedWith, {"$el": $domELSub})
            .THEN(viewInst$ElIs, $domELSub)
            .AND(viewInstElIs, $domELSub.get(0));
    });

    test('refresh with plain object', function () {

        bdd.GIVEN(aViewInst).WHEN(refreshedWith, {"key": "value"} ).THEN(viewInstRerenderedWith, {"key": "value"});
    });

    test('refresh with zonzabone model', function () {

        bdd.GIVEN(aViewInst).WHEN(refreshedWith, model({"key": "value"})).THEN(viewInstRerenderedWith, {"key": "value"});
    });

    test('view can be initialized with template', function () {

        bdd.GIVEN(aViewType).WHEN(anInstCreatedWith, {"template": "<p>I'm a template</p>"}).THEN(viewInstTemplateIs, "<p>I'm a template</p>");
    });

    var domELSuper = $('<div class="super-dom-element"></div>').get(0),
        domELSub = $('<div class="sub-dom-element"></div>').get(0),
        $domELSuper = $('<div class="super-jquery-wrapped-dom-element"></div>'),
        $domELSub = $('<div class="sub-jquery-wrapped-dom-element"></div>'),
        subTypeInstantiates = function () {
            var subType = bdd.given;

            return subType();
        },
        subTypeCreatedFromSuperWithjQuery = function (super_view, $el) {
            return function () {
                var that = Object.create(view());

                that.$el = $el;

                that.init = function () {
                    defaultView.init.apply(this, arguments);

                    return this;
                };

                return that.init();
            };
        },
        defaultView = view(),
        super_view = function () {
            return function () {
                var that = Object.create(defaultView);

                that.el = el;

                that.init = function () {
                    defaultView.init.apply(this, arguments);

                    return this;
                };

                return that.init();
            };
        },
        subTypeCreatedFromSuperWithDOM = function (super_view, el) {
            return function () {
                var that = Object.create(super_view());

                that.el = el;

                that.init = function () {
                    defaultView.init.apply(this, arguments);

                    return this;
                };

                return that.init();
            };
        },
        viewInstElIs = function (el) {
            var inst = bdd.when;

            deepEqual(inst.el, el, '');
        },
        viewInst$ElIs = function ($el) {
            var inst = bdd.when;

            deepEqual(inst.$el, $el, '');
        },
        viewInstTemplateIs = function (templ) {
            var inst = bdd.when;

            equal(inst.template, templ, '');
        },
        anInstCreatedWith = function (options) {
            return bdd.given(options);
        },
        aViewType = function () {
            return view;
        },
        aViewInst = function () {
    		var viewInst = view({
    			"el": $('<div></div>').get(0)
    		});

    		viewInst.template = '<p>{{key}}</p>';

    		return viewInst;
    	},
    	refreshedWith = function (delta) {
            bdd.given.refresh(delta);

    		return bdd.given;
    	},
    	viewInstRerenderedWith = function (delta) {
            var inst = bdd.when;

    		equal(inst.$('p').text(), delta.key, '');

        };
});