
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 17/06/2013
 */
/*global define*/
define('app/events',[],function () {
    

    return function () {
        var that = {},
            _topics = {},
            _execHandler = function (subscriber, args) {
                subscriber.func.apply(subscriber.ctx, args);
            };

        that.trigger = function () {
            var topicList = Array.prototype.shift.call(arguments),
                topicsArr = topicList.split(" "),
                subscribers,
                subscriber,
                len, i, l, k,
                sum = 0;

            for (i = 0, l = topicsArr.length; i < l; i++) {
                subscribers = _topics[topicsArr[i]];
                len = subscribers ? subscribers.length : 0;
                sum = sum + len;

                if (len) {
                    for (k = 0; k < len; k++) {
                        subscriber = subscribers[k];
                        // Making sure event fires asynchronously
                        setTimeout(_execHandler, 0, subscriber, arguments);
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
    };
});
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 17/06/2013
 */
/*global define*/
define('app/utils',['jquery'], function ($) {
    

    var that = {};

    /**
     * Shortcut to shallow clone an object
     * @param obj {Object} Object to clone
     * @returns {Object}
     */
    that.shallowClone = function (obj) {
        return $.extend({}, obj);
    };

    /**
     * Shortcut to deep clone an object
     * @param obj {Object} Object to clone
     * @returns {Object}
     */
    that.deepClone = function (obj) {
        return $.extend(true, {}, obj);
    };

    /**
     * Returns the value of the session cookie given as parameter
     * @param {String} name The name of the cookie the value of wanted
     * @returns {String}
     */
    that.readCookie = function (name) {
        var nameEQ = name + "=",
            ca = document.cookie.split(';'),
            i, c;

        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
            if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
        }
        return null;
    };

    /**
     * Returns true if valid object (array, function or null not wanted)
     * @param elmnt {Object} Object to find out about
     * @returns {Boolean}
     */
    that.validObj = function (elmnt) {
        return (!!elmnt) && (elmnt.constructor === Object);
    };

    /**
     * Returns true if array of valid objects (elements are not array, function or null)
     * @param arr {Array} Array to find out about
     * @returns {Boolean}
     */
    that.arrOfObj = function (arr) {
        var i;

        if (Object.prototype.toString.call(arr) !== '[object Array]') { // This is not an array so quit with false
            return false;
        } else {
            for (i = 0; i < arr.length; i++) {
                if (!this.validObj(arr[i])) {
                    return false; // This member is not a valid object so quit with false
                }
            }
        }

        return true;
    };

    /**
     * Makes dashed strings camel-case
     * @param {String} str String to camel-case
     * @return {String}
     */
    that.camelCase = function (str) {
        return (str || '').toLowerCase().replace(/(\b|-)\w/g, function (m) {
            return m.toUpperCase().replace(/-/, '');
        });
    };

    return that;
});
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define, setTimeout*/
define('app/ui_super',['app/events', 'app/utils', 'jquery'],
    function (events, utils, $) {
        

        return function () {
            var that = events();

            /**
             * Returns the object being up on the prototype chain
             * @returns {Object}
             */
            that.getProto = function () {
                return Object.getPrototypeOf(this);
            };

            return that;
        };
    }
);
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/06/2013
 */
/*global define*/
define(
    'app/collection',['jquery', 'app/ui_super', 'app/utils'],
    function ($, ui_super, utils) {
        return function (arr) {
            

            var that = Object.create(ui_super());

            /**
             * Core of the collection
             * @type {Array}
             */
            that.arr = arr || [];

            /**
             * Resets the collection
             */
            that.reset = function () {
                this.arr = [];

                return this;
            };

            /**
             * Returns the element/s of the collection with given key
             * @param key {String} Key to values
             * @returns {Array.<object>} or {Object}
             */
            that.get = function (key) {
                var ret = [];

                this.arr.forEach(function (e) {
                    if (e[key]) {
                        ret.push(e[key]);
                    }
                });

                if (ret.length === 1) { ret = ret[0]; }

                return ret;
            };

            /**
             * Add new element(s) to the collection
             * @param elmnt {Array.<object>} or {Object}
             */
            that.add = function (toAdd) {
                if (utils.validObj(toAdd)) {
                    this.arr.push(toAdd);
                } else if (utils.arrOfObj(toAdd)) {
                    this.arr = this.arr.concat(toAdd);
                }
            };

            /**
             * Removes objects from the collection filtered by parameter
             * @param {Object} arguments Key value pairs to filter
             * or
             * @param {String} arguments[0] Key to filter
             * @param {*} arguments[1] Value to filter
             * @returns {Array} The array of the removed elements
             */
            that.removeWhere = function () {
                var arr = Array.prototype.slice.call(arguments), filters, ret;

                if (arr.length === 1 && utils.validObj(arr[0])) { // When multiple filters passed in an obj
                    filters = arr[0];
                } else if (arr.length === 2 && typeof arr[0] === 'string') { // When one key value pair passed not wrapped in obj
                    filters = {};
                    filters[arr[0]] = arr[1];
                } else { // Graceful fallback for bad parameters
                    return ret;
                }

                ret = this.arr.filter(function (elmnt, i, array) {
                    for (var key in filters) {
                        if (filters.hasOwnProperty(key) && (filters[key] !== elmnt[key])) { return false; }
                    }

                    array.splice(i, 1);
                    return true;
                });

                return ret;
            };

            /**
             * Returns the elements of the collection with given key and value
             * @param key {String} Key to find
             * @param value {*} Value to find
             * @returns {Array.<object>}
             */
            that.getWhere = function (key, value) {
                var ret = [];

                this.arr.forEach(function (e) {
                    if (e[key] === value) {
                        ret.push(e);
                    }
                });

                return ret;
            };

            /**
             * Proxies to Array.splice
             * @param i {Number} index to splice from
             * @param l {Number} length to splice with
             * @return {Array}
             */
            that.splice = function (i, l) {
                return this.arr.splice(i, l);
            };

            /**
             * Proxies to Array.forEach
             * @param callback {Function} Callback for forEach
             * @param ctx {Object} Context for callback
             */
            that.each = function (callback, ctx) {
                if (ctx) {
                    this.arr.forEach(callback, ctx);
                } else {
                    this.arr.forEach(callback);
                }
            };

            /**
             * Initializes the collection
             * @param {Array.<object>} arr The initial list of objects
             * @returns {collection}
             * @abstract
             */
            that.init = function (arr) {

                return this;
            };

            return that.init(arr);
        };
    }
);
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    'app/model',['jquery', 'app/ui_super', 'app/collection', 'app/utils'],
    function ($, ui_super, collection, utils) {
        

        return function (options) {
            var that = Object.create(ui_super());

            /**
             * Core of the model
             * @type {Object}
             */
            that.attributes = {};

            /**
             * Retrieves the value with the given key
             * @param {String} key The key of the wanted value
             * @returns {*}
             */
            that.get = function (key) {
                return this.attributes[key];
            };

            /**
             * Sets the key with the given value
             * @param {String} key The key of the wanted value
             * @param {String} value The value for the key
             * @returns {app.model}
             */
            that.set = function (key, value) {
                this.attributes[key] = value;

                return this;
            };

            /**
             * Initializes the model
             * @param {String} options Initial attributes
             * @returns {app.model}
             * @abstract
             */
            that.init = function (options) {

                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        if (typeof options[key] === 'function') { // Option is a function
                            this[key] = options[key];
                        } else if (utils.arrOfObj(options[key])) { // Option is an array populated by valid objects
                            this.attributes[key] = collection(options[key]);
                        } else { // Fallback
                            this.attributes[key] = options[key];
                        }
                    }
                }

                return this;
            };

            return that.init(options);
        };
    }
);
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define*/
define(
    'app/view',['jquery', 'app/ui_super', 'mustache'],
    function ($, ui_super, mustache) {
        

        return function (options) {
            var that = Object.create(ui_super());

            that.$el = (options && options.$el) ? options.$el : (options && options.el) ? $(options.el) : null;

            that.el = (options && options.el) ? options.el : (options && options.$el) ? options.$el.get(0) : null;

            that.className = (options && options.className) ? options.className : null;

            /**
             * @abstract
             * @type {Object}
             */
            that.viewModel = $.extend((options && options.viewModel) ? options.viewModel : {}, {
                i18n: function () {
                    return function (t) {
                        return t;
                    };
                }
            });

            /**
             * @abstract
             * @type {String}
             */
            that.template = "";

            /**
             * @abstract
             * @type {Object}
             */
            that.partials = {};

            /**
             * Finds an element in the view
             * @param {String} selector Css selector to the target
             * @returns {jQuery.Object}
             */
            that.$ = function (selector) {
                return this.$el.find(selector);
            };

            /**
             * Renders the view
             * @returns {Object}
             */
            that.render = function () {
                this.$el.html(mustache.to_html(this.template, this.viewModel, this.partials));
                return this;
            };

            that.refresh = function (data) {
                this.viewModel = $.extend(this.viewModel, data);
                this.render();
            };

            that.teardown = function () {
                this.$el.remove();
                delete this.$el; // For proper garbage collection
                delete this.el; // For proper garbage collection
            };

            /**
             * Initializes the view
             * @param {String} options Initial arguments
             * @returns {view}
             * @abstract
             */
            that.init = function (options) {
                this.el = this.el || this.$el ? this.$el.get(0) : null;

                this.$el = this.$el || this.el ? $(this.el) : null;

                if (this.className) {
                    this.$el.addClass(this.className);
                }

                // When this is overridden in the sub type we need to do extend again to get _ function
                // When there is no sub type we just repeat the action from above
                this.viewModel = $.extend(this.viewModel, {
                    _: function () {
                        return function (t) {
                            return t;
                        };
                    }
                });

                return this;
            };

            return that.init(options);
        };
    }
);
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define, require*/
define(
    'app/controller',['jquery', 'app/ui_super', 'app/utils', 'app/view', 'app/model'],
    function ($, ui_super, utils, view, model) {
        

        $.fn.extend({
            findClosest: function (sel) {
                var $ret = $(),
                    $parent = this.parent(sel),
                    $closest = this.parent().closest(sel);

                if ($parent.length) {
                    $ret = $parent;
                } else if ($closest.length) {
                    $ret = $closest;
                }

                return $ret;
            }
        });

        return function (options) {
            /** ------- ---- */
            /** Private area */
            /** ------- ---- */

            var that = Object.create(ui_super());

            /** ------ ---- */
            /** Public area */
            /** ------ ---- */

            /**
             * The options that the controller is created with
             * @type {Object}
             * @public
             */
            that.options = options;

            /**
             * Changes updates browser location bar and fires callback
             * @public
             */
            that.push = function (url, state) {
                window.history.pushState(state, null, url);
            };

            /**
             * Loads the sub blocks in the area of this block (Should be used only if this is a block controller)
             * @param {app.events} broker Reference to the global event dispatcher
             * @param parent {app.controller} Reference to the parent controller
             * @return {app.controller}
             * @public
             */
            that.loadBlocks = function (broker, parent) {
                var $el = parent ? $(parent.options.el) : $(document);

                $el.find('*[data-block]').each(function () {
                    var $this = $(this), self, options;

                    if (!$this.findClosest('*[data-block]').length || ($this.findClosest('*[data-block]').get(0) === $el.get(0))) {
                        self = this;
                        options = $this.data();

                        require([options.block], function (block_contr) {
                            options.el = self;

                            if (parent) { // When a block view instantiates the embeded block views.
                                options.parent = parent;
                                options.broker = broker || parent.options.broker;
                            } else if (broker) { // When a root block views get instantiated.
                                options.broker = broker;
                            } else { // Secure fallback. (This should not happen.)
                                options.broker = Object.create(ui_super);
                            }
                            var block = block_contr(options);
                        });
                    }
                });

                return this;
            };

            /**
             * Tears down the controller and its views
             * @public
             */
            that.teardown = function () {
                $(this.options.el).off();

                if (this.view.arr && Object.prototype.toString.call(this.view.arr) === '[object Array]' && this.view.arr.length) { // View is a collection of views
                    this.view.each(function (view) {
                        view[Object.keys(view)[0]].teardown();
                    });
                } else {
                    this.view.teardown();
                }
            };

            /**
             * Initializes the controller
             * @abstract
             */
            that.init = function (options) {
                var key, match, event, selector, handler, ctx,
                    modelOpts,
                    eventSplitter = /^(\S+)\s*(.*)$/;

                // Creating basic view if that's not defined in the sub factory
                this.view = this.view || view({ "el": options.el });

                // Creating a model for the controller if that's not defined in the sub factory
                if (options && !options.model && !this.model) { // When the controller is not initialized with any model (Should happen if the sub factory produces block controllers)
                    modelOpts = $.extend({}, options);
                    delete modelOpts.el;
                    delete modelOpts.broker;
                    delete modelOpts.block;

                    this.model = model(modelOpts);
                } else if (options && options.model && !this.model) { // When the controller is initialized with a model
                    this.model = options.model;
                }

                // Delegating browser events. They are supposed to be declared in the sub factory
                if (this.events) {
                    $(this.options.el).off();
                    for (key in this.events) {
                        if (this.events.hasOwnProperty(key)) {
                            match = key.match(eventSplitter);
                            event = match[1];
                            selector = match[2];
                            handler = this.events[key].handler;
                            ctx = this.events[key].ctx;

                            if (selector === '') {
                                $(this.options.el).on(event, handler.bind(ctx));
                            } else {
                                $(this.options.el).on(event, selector, handler.bind(ctx));
                            }
                        }
                    }
                }
            };

            return that;
        };
    }
);
/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 14/05/2013
 */
/*global define*/
define(
    'app',[
        'jquery',
        'app/ui_super',
        'app/events',
        'app/utils',
        'app/model',
        'app/view',
        'app/controller',
        'app/collection'
    ],
    function ($, ui_super, events, utils, model, view, controller, collection) {
        

        return {
            ui_super: ui_super,
            events: events,
            utils: utils,
            view: view,
            model: model,
            controller: controller,
            collection: collection
        };
    }
);