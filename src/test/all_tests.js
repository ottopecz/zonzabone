/*global require, QUnit*/
(function () {
    var config = {
            "baseUrl": '../modules',
            "waitSeconds": 5,
            "urlArgs": 'bust=' + (new Date()).getTime(),
            "paths": {
                "jquery"            : '../test/lib/jquery/jquery.min',
                "bdd"               : '../test/lib/bdd',
                "mustache"          : '../test/lib/mustache',
                "sinon"             : '../test/lib/sinon',
                "mockjax"           : '../test/lib/jquery/jquery.mockjax'
            }
        };

    require.config(config);

    require([
        "jquery",
        "../test/collection",
        "../test/utils"
    ], function () {
        $.ajaxSetup({ contentType: "application/json", "async": false });
        QUnit.start();
    });
})();