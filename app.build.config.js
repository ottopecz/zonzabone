({
    baseUrl: "../source/js/",
    paths: {
        "jquery": "empty:",
        "mustache": "empty:"
    },
    name: "app/app",
    include: [
        "lib/jquery-ui-1.10.3.custom",
        "lib/jquery-ui-timepicker-addon"
    ],
    out: "../build/js/bundle/app.js",
    optimize: "none"
})
