define(["jquery", "backbone", "icanhaz", "bootstrap"], function ($, Backbone, ICanHaz) {
    var container = $("div.container"),
        todoContainer = $("ul.todo-container"),
        ListView = Backbone.View.extend({
            className: "row",

            initialize: function () {
                this.$el.append(ICanHaz.listview())
                container.append(this.$el)

                this.collection.on("add", this.append, this)
                this.collection.fetch()
            },

            render: function () {
                return this
            },

            append: function (todo) {
                new TodoView({ model: todo })
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
                    var todo = this.$("input.new-todo").val()

                    if (todo = $.trim(todo)) {
                        this.collection.create({ todo: todo })
                    }

                    this.modalClose()
                }
            },

            modalClose: function (event) {
                this.$("div.modal").modal("hide")
            }
        }),
        TodoView = Backbone.View.extend({
            tagName: "li",

            initialize: function () {
                this.$el.append(ICanHaz.todoview(this.model))
                todoContainer.append(this.$el)
            },

            render: function () {
                return this
            }
        })

    return {
        ListView: ListView,
        TodoView: TodoView
    }
})
