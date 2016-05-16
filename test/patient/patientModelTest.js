var crypto = require('crypto')
var bcrypt = require('bcryptjs')
var should = require('should')
var mongoose = require('mongoose')
var Patient = require('../../app/model/patient')
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS");

function getRandomString(len) {
  if (!len) len = 16

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex')
}



var patient

// test
describe('<Unit Test', function() {
  describe('Model Patient:', function() {
    before(function(done) {
      patient = {
        IdCardNo: getRandomString(),
        password: 'password',
        firstName:'firstName',
        lastName:'lastName',
        gender:'felmale',
        birth:123,
        email:'396275915@qq.com',
        mobileNo:'mobileNo'
      }

      done()
    })

    describe('Before Method save', function() {
      it('should begin without test Patient', function(done) {
        Patient.find({IdCardNo: patient.IdCardNo}, function(err, patients) {
          patients.should.have.length(0)

          done()
        })
      })
    })

    describe('Patient save', function() {
      it('should save without problems', function(done) {
        var _patient = new Patient(patient)

        _patient.save(function(err) {
          should.not.exist(err)
          _patient.remove(function(err) {
            should.not.exist(err)
            done()
          })
        })
      })

      it('should password be hashed correctly', function(done) {
        var password = patient.password
        var _patient = new Patient(patient)

        _patient.save(function(err) {
          should.not.exist(err)
          _patient.password.should.not.have.length(0)

          bcrypt.compare(password, _patient.password, function(err, isMatch) {
            should.not.exist(err)
            isMatch.should.equal(true)

            _patient.remove(function(err) {
              should.not.exist(err)
              done()
            })
          })
        })
      })

      it('should fail to save an existing Patient', function(done) {
        var _patient1 = new Patient(patient)

        _patient1.save(function(err) {
          should.not.exist(err)

          var _patient2 = new Patient(patient)

          _patient2.save(function(err) {
            should.exist(err)

            _patient1.remove(function(err) {
              if (!err) {
                _patient2.remove(function(err) {
                  done()
                })
              }
            })
          })
        })
      })
    })

    after(function(done) {
      // clear Patient info
      done()
    })
  })
})