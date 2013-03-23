if (typeof define != "function" && typeof module == "object") {
    function define(requirements, setup) {
        module.exports = setup.apply(this, requirements.map(require))
    }
}

define(["./lib/diff-match-patch"], function (lib) {
    function Undo(init) {
        this.init = init || null
        this.stack = Array()
    }

    return Undo
})
