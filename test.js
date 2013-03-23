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
    })
})
