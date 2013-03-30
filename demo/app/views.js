define(["jquery", "backbone", "icanhaz", "bootstrap"], function ($, Backbone, ICanHaz) {
    var container = $(".container"),
        ListView = Backbone.View.extend({
            className: "row",

            initialize: function () {
                this.$el.append(ICanHaz.listview())
                container.append(this.$el)
            },

            render: function () {
                return this
            },

            events: {
                "click a.action-new": "actionNew",
                "click a.action-undo": "actionUndo",
                "click a.action-redo": "actionRedo"
            },

            actionNew: function (event) {
                event.preventDefault()

                this.$(".modal").modal()
            },

            actionUndo: function (event) {
                event.preventDefault()
            },

            actionRedo: function (event) {
                event.preventDefault()
            }
        })

    return {
        ListView: ListView
    }
})
