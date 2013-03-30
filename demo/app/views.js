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
                "click a.action-redo": "actionRedo",
                "shown div.modal": "modalShow",
                "keyup input.new-todo": "modalKeyup",
                "blur input.new-todo": "modalClose"
            },

            actionNew: function (event) {
                event.preventDefault()

                this.$("input.new-todo").val("")

                this.$("div.modal").modal()
            },

            actionUndo: function (event) {
                event.preventDefault()
            },

            actionRedo: function (event) {
                event.preventDefault()
            },

            modalShow: function (event) {
                this.$("input.new-todo").focus()
            },

            modalKeyup: function (event) {
                if (event.keyCode == 0xd) {
                    this.modalClose()
                }
            },

            modalClose: function (event) {
                this.$("div.modal").modal("hide")
            }
        })

    return {
        ListView: ListView
    }
})
