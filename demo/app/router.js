define(["backbone", "models", "views"], function (Backbone, models, views) {
    var collection = new models.TodoList

    return Backbone.Router.extend({
        routes: {"": "default"},

        default: function () {
            if (this.activeView) {
                this.activeView.remove()
            }

            this.activeView = new views.ListView({ collection: collection })
        },

        initialize: function () {
            Backbone.history.start()
        }
    })
})
