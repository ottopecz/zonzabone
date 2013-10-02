/*global require, QUnit*/
require.config({
    'baseUrl'       : '../',
    'waitSeconds'   : 5,
    'urlArgs'       : 'bust=' + (new Date()).getTime(),
    'paths' : {
        'zonzabone' : 'src/zonzabone',
        'jquery'    : 'bower_components/jquery/jquery',
        'bdd'       : 'bower_components/bdd/bdd',
        'mustache'  : 'bower_components/mustache/mustache',
        'sinon'     : 'bower_components/sinon/sinon-1.7.3',
        'mockjax'   : 'bower_components/jquery-mockjax/jquery.mockjax',
        'polyfills' : 'lib/polyfills'
    },
    'shim' : {
        'mockjax'   : { deps : ['jquery'] }
    },
    'deps' : [
        'jquery',
        'test/collection',
        'test/utils'
    ],
    'callback'      : function () {
        $.ajaxSetup({ contentType: 'application/json', 'async': false });
        QUnit.start();
    }
});