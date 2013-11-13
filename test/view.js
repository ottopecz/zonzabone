/*global bdd, define, module, test, sinon, asyncTest, stop, start, deepEqual, equal, notDeepEqual, notStrictEqual, ok, strictEqual, throws, expect*/
define(function (require) {
    "use strict";

    var view 	= require('zonzabone/view'),
        model   = require('zonzabone/model'),
        bdd     = require('bdd');

    module('View Tests');

    test('refresh with palin object', function () {

        bdd.GIVEN(aViewInst).WHEN(refreshedWith, {"key": "value"} ).THEN(viewInstRerenderedWith, {"key": "value"});
    });

    test('refresh with zonzabone model', function () {
        
        bdd.GIVEN(aViewInst).WHEN(refreshedWith, model({"key": "value"})).THEN(viewInstRerenderedWith, {"key": "value"});
    });

    var aViewInst = function () {
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
    	}

});