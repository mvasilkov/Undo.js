define(["backbone", "backbone.localStorage"], function (Backbone) {
    var Todo = Backbone.Model.extend({
            defaults: function () {
                return {
                    todo: "(nothing)",
                    done: false
                }
            },

            toggle: function () {
                this.save({ done: !this.get("done") })
            }
        }),
        TodoList = Backbone.Collection.extend({
            model: Todo,

            localStorage: new Backbone.LocalStorage("todo")
        })

    return {
        Todo: Todo,
        TodoList: TodoList
    }
})
