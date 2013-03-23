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

        it("should return false when reached bottom of stack", function () {
            undo.undo({ b: "obj.b" })

            undo.stack.should.not.be.empty
            undo.canUndo().should.be.false
        })
    })

    describe("#canRedo()", function () {
        it("should initially return false", function () {
            undo.reset()

            undo.stack.should.be.empty
            undo.canRedo().should.be.false
        })

        it("should return false when at top of stack", function () {
            undo.rec({ a: "obj.a" }, function () {
                return { b: "obj.b" }
            })

            undo.stack.should.not.be.empty
            undo.canRedo().should.be.false
        })

        it("should return true when stack is not empty", function () {
            undo.undo({ b: "obj.b" })

            undo.stack.should.not.be.empty
            undo.canRedo().should.be.true
        })
    })

    describe("#undo()", function () {
        var obj = {}

        it("does nothing when stack is empty", function () {
            undo.reset()

            undo.stack.should.be.empty
            undo.undo("baka").should.equal("baka")
        })

        it("should apply patches in reverse order", function () {
            undo.rec(obj, function () {
                obj.a = "obj.a"
            })

            undo.rec(obj, function () {
                obj.b = "obj.b"
            })

            var a = { a: "obj.a" },
                b = { b: "obj.b" }

            obj.should.include(a)
            obj.should.include(b)

            // revert `obj.b`
            obj = undo.undo(obj)

            obj.should.include(a)
            obj.should.not.include(b)

            // revert `obj.a`
            obj = undo.undo(obj)

            obj.should.not.include(a)
            obj.should.not.include(b)
        })

        it("should be non-destructive", function () {
            // as a result of previous test
            undo.stack.should.not.be.empty

            // can't undo
            undo.canUndo().should.be.false

            var a = { a: "obj.a" }

            obj.should.not.include(a)

            // discard stack
            undo.rec(obj, function () {
                obj.a = "obj.a"
            })

            // ignore return value
            undo.undo(obj)

            obj.should.include(a)
        })
    })

    describe("#reset()", function () {
        it("should reset instance to defaults", function () {
            undo.rec("foo", function () { return "bar" })

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
