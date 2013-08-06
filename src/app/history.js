/*global define*/
define(function (require) {
    "use strict";

    var $ = require('jquery');

	console.log('history.js');

	var that = {},

	_popstateHandler = null,

	_addeventListener = function(event, popstateHandler) {

		window.addEventListener(event, popstateHandler);
	};

	/**
	 * Changes updates browser location bar and fires callback
	 */
	that.push = function(url, state, popstateHandler){

		((history && history.pushState) ? history.pushState : $.noop)((state || null), null, url);

    	_popstateHandler = popstateHandler;
	};

	/**
	 * Initializes the history module
	 * @returns {history module}
	 */
	that.init = function(options) {

		console.log('history.init()');

		_addeventListener("popstate", (function(e) {

			(_popstateHandler ? _popstateHandler : $.noop)(e);

		}).bind(that));

		return this;
	};

	return that;
});