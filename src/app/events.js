/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 17/06/2013
 */
/*global define*/
define(function () {
    "use strict";

    var that = {},
        _topics = {};

    that.trigger = function () {
        var topicList = Array.prototype.shift.call(arguments),
            topicsArr = topicList.split(" "),
            subscribers,
            subscriber,
            len, i, l,
            sum = 0;

        for (i = 0, l = topicsArr.length; i < l; i++) {
            subscribers = _topics[topicsArr[i]];
            len = subscribers ? subscribers.length : 0;
            sum = sum + len;

            if (len) {
                while (len--) {
                    subscriber = subscribers[len];
                    // Making sure event fires asynchronously
                    setTimeout(subscriber.func.apply(subscriber.ctx, arguments), 0);
                }
            } else if (i === l - 1 && sum === 0) {
                return false;
            }
        }

        return this;
    };

    that.on = function (topicsList, func, ctx) {
        var topicsArr = topicsList.split(" "),
            subscribed = false,
            topic,
            i, j, k, l;

        for (j = 0, k = topicsArr.length; j < k; j++) {
            topic = topicsArr[j];

            if (!_topics[topic]) {
                _topics[topic] = [];
            }

            ctx = ctx || null;

            for (i = 0, l = _topics[topic].length; i < l; i++) {
                if (_topics[topic][i].func === func) {
                    subscribed = true;
                    break;
                }
            }

            if (!subscribed) {
                _topics[topic].push({
                    func: func,
                    ctx: ctx
                });
            }
        }
        return this;
    };

    that.off = function (arg0, arg1) {
        if (arguments.length === 0) {
            _topics = {};
            return this;
        }

        var t, i, l, func = typeof arg0 === "function" ? arg0 : arg1;

        for (t in _topics) {
            if (_topics.hasOwnProperty(t)) {
                if (_topics[t].length) {
                    if (typeof arg0 === "string" && t === arg0 && !arg1) {
                        _topics[t] = [];
                    } else if (typeof arg0 === "function" || (t === arg0 && typeof arg1 === "function")) {
                        for (i = 0, l = _topics[t].length; i < l; i++) {
                            if (_topics[t][i].func === func) {
                                _topics[t].splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return this;
    };

    return that;
});