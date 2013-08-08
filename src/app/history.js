/*global define*/

define(['jquery'], function ($) {
    "use strict";

    console.log('history.js');

    var that = {},

    _popstateHandler = null,

    _addeventListener = function (event, popstateHandler) {
        window.addEventListener(event, popstateHandler);
    };

    /**
     * Changes updates browser location bar and fires callback
     */
    that.push = function (url, state, popstateHandler) {
        window.history.pushState(state, null, url);
        _popstateHandler = popstateHandler;
    };

    /**
     * Initializes the history module
     * @returns {history module}
     */
    that.init = function (options) {
        _addeventListener("popstate", function (e) {
            _popstateHandler(e);
        }.bind(that));
        return this;
    };

    return that;
});