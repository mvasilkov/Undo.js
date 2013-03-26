require.config({
    paths: {
        /* lib */
        "jquery": "demo/lib/jquery-2.0.0b2",
        "lodash": "demo/lib/lodash",
        "backbone": "demo/lib/backbone",
        "mustache": "demo/lib/mustache",
        "icanhaz": "demo/lib/ICanHaz-no-mustache",
        /* app */
        "router": "demo/app/router",
        "views": "demo/app/views"
    },
    shim: {
        "backbone": {
            deps: ["jquery", "lodash"],
            exports: "Backbone"
        },
        "icanhaz": {
            deps: ["jquery", "mustache"],
            exports: "ich"
        }
    }
})

require(["router", "mustache", "icanhaz"], function (Router, Mustache, ICanHaz) {
    /* ICanHaz */
    this.Mustache = Mustache
    ICanHaz.grabTemplates()

    new Router
})
