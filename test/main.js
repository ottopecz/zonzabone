require.config({
    'baseUrl'       : '../',
    'waitSeconds'   : 5,
    'urlArgs'       : 'bust=' + (new Date()).getTime(),
    'paths' : {
        'zonzabone' : 'src/zonzabone',
        'jquery'    : 'lib/jquery/jquery.min',
        'bdd'       : 'lib/bdd',
        'mustache'  : 'lib/mustache',
        'sinon'     : 'lib/sinon',
        'mockjax'   : 'lib/jquery/jquery.mockjax',
        'polyfills' : 'lib/polyfills',
        'qunit'     : 'lib/qunit/qunit'
    },
    'shim' : {
        'qunit'     : { deps : ['jquery'] },
        'mockjax'   : { deps : ['jquery'] }
    },
    'deps' : [
        'jquery',
        'qunit',
        'test/collection',
        'test/utils'
    ],
    'callback'      : function () {

        $.ajaxSetup({ contentType: 'application/json', 'async': false });
        QUnit.load();
    }
});