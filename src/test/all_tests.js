/**
 * @author Otto Pecz - otto.pecz@hogarthww.com
 * @date: 23/09/2013
 */
/*global require, QUnit*/
(function () {
    var entry = document.getElementById('js_entry'),
        staticRoot = entry.getAttribute('data-static'),
        config = {
            "baseUrl": staticRoot + 'zonzabone/src/test/',
            "waitSeconds": 5,
            "urlArgs": 'bust=' + (new Date()).getTime(),
            "paths": {
                "jquery"            : staticRoot + 'jquery/jquery.min',
                "bdd"               : staticRoot + 'bdd/bdd',
                "mustache"          : staticRoot + 'mustache/mustache',
                "zonzabone"         : staticRoot + 'zonzabone/zonzabone',
                "zonzabone_tests"   : staticRoot + 'zonzabone/src/test',
                "sinon"             : staticRoot + 'sinon/sinon-1.7.3',
                "mockjax"           : staticRoot + 'jquery-mockjax/jquery.mockjax',
                "text"              : staticRoot + 'text/text',
                "json"              : staticRoot + 'requirejs-plugins/src/json'
            },
            "shim" : {
                "mockjax"           : { deps : ['jquery'] },
                "zonzabone"         : { deps : ["jquery", "mustache"] }
            }
        },
        execTests = function () {
            require([
                "utils",
                "collection"
            ], function () {
                $.ajaxSetup({ contentType: "application/json", "async": false });
                QUnit.start();
            });
        };

    require.config(config);

    execTests();
})();