define(["jquery", "backbone", "icanhaz"], function ($, Backbone, ICanHaz) {
    var container = $(".container"),
        ListView = Backbone.View.extend({
            className: "row",

            initialize: function () {
                this.$el.append(ICanHaz.listview())
                container.append(this.$el)
            },

            render: function () {
                return this
            }
        })

    return {
        ListView: ListView
    }
})
