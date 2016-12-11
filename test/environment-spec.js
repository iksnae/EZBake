
var sinon = require('sinon');
var chai = require('chai');
var rewire = require('rewire');
var expect = chai.expect;

describe("environment", function() {
  describe('selectEnvironment', function () {

    var use_openshift = false;
    var use_beanstalk = false;
    var use_local = false;

    app_stub = { 
        OpenShift:function (argument) {
          use_openshift = true;
        },
        BeanStalk:function(){
          use_beanstalk = true;
        },
        localhost:function(){
          use_local = true;
        }

      }

    describe("use_openshift == true", function () {
      it("should respond OpenShift", function(done) {
        expect(use_openshift).to.be.true;
        done();
      });

    })//end describe use_opendshift

  }); //end select element
}); //end describe environment