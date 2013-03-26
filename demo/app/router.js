define(["backbone", "views"], function (Backbone, views) {
    return Backbone.Router.extend({
        routes: {"": "default"},

        default: function () {
            if (this.activeView) {
                this.activeView.remove()
            }

            this.activeView = new views.ListView
        },

        initialize: function () {
            Backbone.history.start()
        }
    })
})
