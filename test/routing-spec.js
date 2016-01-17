var sinon = require('sinon');
var chai = require('chai');
var rewire = require('rewire');
var expect = chai.expect;



describe("routing", function() {
  describe("configureRoutes", function () {

    var sut = rewire('../routing');
    var called_app_get = false;
    var called_app_post = false;
    var called_app_put = false;
    var called_app_delete = false;
    
    var app_stub;

    before(function () {
      sut = rewire('../routing');
      called_app_get = false;
      called_app_post = false;
      called_app_put = false;
      called_app_delete = false;

      app_stub = { 
        get:function (argument) {
          called_app_get = true;
        },
        post:function(){
          called_app_post = true;
        },
        put:function(){
          called_app_put = true;
        },
        delete:function(){
          called_app_delete = true;
        }

      }

      // supress loggging
      this.console = {
        log:sinon.spy()
      };
      sut.__set__("console",this.console);
    });

    describe("method == 'get'", function () {

      it("should invoke get() on app", function (done) {
        sut(app_stub,{endpoints:[{"path":"/","methods":["get"],"handler":"/index"}]},{});
        expect(called_app_get).to.be.true;
        done();
      });

    });

    describe("method == 'post'", function () {
      it("should invoke post() on app", function (done) {
        sut(app_stub,{endpoints:[{"path":"/","methods":["post"],"handler":"/index"}]},{});
        expect(called_app_post).to.be.true;
        done();
      });
    });

    describe("method == 'put'", function () {
      it("should invoke post() on app", function (done) {
        sut(app_stub,{endpoints:[{"path":"/","methods":["put"],"handler":"/index"}]},{});
        expect(called_app_put).to.be.true;
        done();
      });
    });

    describe("method == 'delete'", function () {
      it("should invoke post() on app", function (done) {
        sut(app_stub,{endpoints:[{"path":"/","methods":["delete"],"handler":"/index"}]},{});
        expect(called_app_delete).to.be.true;
        done();
      });
    });
  });


  it("bindHandler");
  it("skip_check");
  it("admin_check");
});