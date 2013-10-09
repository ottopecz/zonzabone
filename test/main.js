/*global require, QUnit*/
require.config({
    'baseUrl'       : '../',
    'waitSeconds'   : 2,
    'urlArgs'       : 'bust=' + (new Date()).getTime(),
    'paths' : {
        'zonzabone' :  window.location.hash === "#built" ? 'zonzabone' : 'src/zonzabone',
        'jquery'    : 'bower_components/jquery/jquery',
        'bdd'       : 'bower_components/bdd/bdd',
        'mustache'  : 'bower_components/mustache/mustache',
        'sinon'     : 'bower_components/sinon/sinon-1.7.3',
        'mockjax'   : 'bower_components/jquery-mockjax/jquery.mockjax',
        'polyfills' : 'lib/polyfills'
    },
    'shim' : {
        'mockjax'   : ['jquery']
    }
});

require([
    'jquery',
    'zonzabone'
], function ($) {
    require([
        'test/collection',
        'test/controller',
        'test/events',
        'test/model',
        'test/utils',
        'test/view',
    ], function () {
        $.ajaxSetup({ contentType: 'application/json', 'async': false });
        QUnit.start();
    });
});