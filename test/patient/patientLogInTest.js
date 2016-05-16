var crypto = require('crypto')
var bcrypt = require('bcryptjs')
var should = require('should')
var mongoose = require('mongoose')
var Patient = require('../../app/model/patient')
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS")
var request=require("http-request")

function getRandomString(len) {
  if (!len) len = 16

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex')
}



var patient1
var patient2

// test
describe('<Unit Test', function() {
  describe('Model Patient:', function() {
    before(function(done) {
      patient1 = {
        IdCardNo: getRandomString(),
        password: 'password',
        firstName:'firstName',
        lastName:'lastName',
        gender:'felmale',
        birth:123,
        email:'396275915@qq.com',
        mobileNo:'mobileNo'
      }

      Patient.find({IdCardNo: patient1.IdCardNo}, function(err, patients) {
          patients.should.have.length(0)
      })

      new Patient(patient1).save(function(err) {
        should.not.exist(err)
      })
      patient2 = {
        IdCardNo:getRandomString(),
        password: 'password',
        firstName:'firstName',
        lastName:'lastName',
        gender:'felmale',
        birth:123,
        email:'396275915@qq.com',
        mobileNo:'mobileNo'
      }

      Patient.find({IdCardNo: patient2.IdCardNo}, function(err, patients) {
          patients.should.have.length(0)
      })

      new Patient(patient2).save(function(err) {
        should.not.exist(err)
      })

      done()
    })

    describe('Query Patient Info', function() {
      it("should query patient1's all information", function(done) {
        // var form = new request.FormData();

        // form.append('IdCardNo', '1');
        // form.append('password', 'password');
        // console.log(form);

        var reqBody = {
          IdCardNo: patient1.IdCardNo,
          password: 'password'
        };

        request.post({
          url: 'http://192.168.31.160:3001/user/signInPatientHandler',
          reqBody: reqBody,
          headers: {
            // specify how to handle the request, http-request makes no assumptions
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        },function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(res.code, res.headers, res.buffer.toString());
        });
        
      })
    })

    after(function(done) {
      Patient.remove({}, (function(err) {
        should.not.exist(err)
      }))
      done()
    })
  })
})