require.config({
    paths: {
        /* lib */
        "jquery": "demo/lib/jquery-2.0.0b2",
        "lodash": "demo/lib/lodash",
        "backbone": "demo/lib/backbone",
        "backbone.localStorage": "demo/lib/backbone.localStorage",
        "mustache": "demo/lib/mustache",
        "icanhaz": "demo/lib/ICanHaz-no-mustache",
        "bootstrap": "demo/lib/bootstrap",
        /* app */
        "router": "demo/app/router",
        "models": "demo/app/models",
        "views": "demo/app/views"
    },
    map: {
        "backbone.localStorage": {
            "underscore": "lodash"
        }
    },
    shim: {
        "backbone": {
            deps: ["jquery", "lodash"],
            exports: "Backbone"
        },
        "bootstrap": ["jquery"],
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
