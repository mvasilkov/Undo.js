if (typeof define != "function" && typeof module == "object") {
    function define(requirements, setup) {
        module.exports = setup.apply(this, requirements.map(require))
    }
}

define(["./lib/diff-match-patch"], function (lib) {
    "use strict"

    var utils = new lib.diff_match_patch

    function makePatch(a, b) {
        var diff = utils.diff_main(b, a)

        if (diff.length > 2) {
            utils.diff_cleanupEfficiency(diff)
        }

        return utils.patch_make(b, diff)
    }

    function Undo() {
        this.stack = Array()
        this.p = 0
    }

    Undo.prototype.rec = function (obj, fun) {
        var a = JSON.stringify(obj),
            b = JSON.stringify(fun(obj) || obj),
            patch = makePatch(a, b)

        if (!patch.length) return

        if (this.stack.length > this.p) {
            this.stack.length = this.p
        }

        console.assert(this.p === this.stack.length)

        this.stack.push(patch)
        ++this.p
    }

    return Undo
})
