/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date 21/05/2013
 */
/*global define, require*/
define(
    ['jquery', 'app/events', 'app/model', 'app/view', 'jq/fn.find_closest'],
    function ($, events, model, view) {
        return function (options) {
            var that = Object.create(events);

            that.options = options;

            that.loadBlocks = function (broker, parent) {
                var $el = parent ? parent.view.$el : $(document);

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
                                options.broker = Object.create(events);
                            }
                            var block = block_contr(options);
                        });
                    }
                });

                return this;
            };

            return that;
        };
    }
);