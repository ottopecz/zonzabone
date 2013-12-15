/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var view 	= require('zonzabone/view'),
        model   = require('zonzabone/model'),
        bdd     = require('bdd');

    module('View Tests');

    test('el of view can be overridden in sub-type', function () {

        bdd
            .GIVEN(subViewTypeWithDOM, domEL)
            .WHEN(subTypeInstantiates)
            .THEN(viewInstElIs, domEL)
            .AND(viewInst$ElIs, $(domEL));
    });

    test('$el of view can be overridden in sub-type', function () {

        bdd
            .GIVEN(subViewTypeWithjQuery, $domEL)
            .WHEN(subTypeInstantiates)
            .THEN(viewInstElIs, $domEL.get(0))
            .AND(viewInst$ElIs, $domEL);
    });

    test('view can be initialized with a dom element', function () {

        bdd
            .GIVEN(aViewType)
            .WHEN(anInstCreatedWith, {"el": domEL})
            .THEN(viewInstElIs, domEL)
            .AND(viewInst$ElIs, $(domEL));
    });

    test('view can be initialized with a jquery wrapped dom element', function () {

        bdd
            .GIVEN(aViewType)
            .WHEN(anInstCreatedWith, {"$el": $domEL})
            .THEN(viewInst$ElIs, $domEL)
            .AND(viewInstElIs, $domEL.get(0));
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

    var domEL = $('<div class="dom-element"></div>').get(0),
        $domEL = $('<div class="jquery-wrapped-dom-element"></div>'),
        subTypeInstantiates = function () {
            var subType = bdd.given;

            return subType();
        },
        subViewTypeWithjQuery = function ($el) {
            return function () {
                var that = Object.create(view());

                that.$el = $el;

                that.init = function () {
                    this.getProto().init.apply(this, arguments);

                    return this;
                };

                return that.init();
            };
        },
        subViewTypeWithDOM = function (el) {
            return function () {
                var that = Object.create(view());

                that.el = el;

                that.init = function () {
                    this.getProto().init.apply(this, arguments);

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