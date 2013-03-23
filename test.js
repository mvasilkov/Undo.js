var should = require("should"),
    Undo = require("./undo")

describe("Undo", function () {
    "use strict"

    var undo = new Undo

    it("should start with an empty stack", function () {
        undo.stack.length.should.equal(0)
    })

    describe("#rec()", function () {
        var obj = {}

        it("should save patches on stack", function () {
            undo.rec(obj, function () {
                obj.a = "obj.a"
            })

            undo.stack.length.should.equal(1)
        })

        it("should not save empty patches", function () {
            undo.rec(obj, function () {
                // do nothing
            })

            undo.stack.length.should.equal(1)
        })

        it("should favor return value", function () {
            undo.rec(obj, function () {
                return { b: "obj.b" }
            })

            undo.stack.length.should.equal(2)
        })

        it("should store patches as text", function () {
            undo.stack.forEach(function (patch) {
                patch.should.be.a("string")
            })
        })
    })

    describe("#canUndo()", function () {
        it("should initially return false", function () {
            undo.reset()

            undo.stack.should.be.empty
            undo.canUndo().should.be.false
        })

        it("should return true when stack is not empty", function () {
            undo.rec({ a: "obj.a" }, function () {
                return { b: "obj.b" }
            })

            undo.stack.should.not.be.empty
            undo.canUndo().should.be.true
        })
    })

    describe("#reset()", function () {
        it("should reset instance to defaults", function () {
            // as a result of previous test
            undo.stack.should.not.be.empty
            undo.canUndo().should.be.true

            // reset stack
            undo.reset()

            // same as `undo = new Undo`
            undo.stack.should.be.empty
            undo.canUndo().should.be.false
        })
    })
})
