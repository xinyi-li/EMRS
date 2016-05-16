var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10

var PatientSchema = new mongoose.Schema({
  IdCardNo: {
    unique: true,
    type: String
  },
  password: String,
  firstName:String,
  lastName:String,
  gender:String,
  birth:Number,
  email:String,
  mobileNo:String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

PatientSchema.pre('save', function(next) {
  var patient = this

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(patient.password, salt, function(err, hash) {
      if (err) return next(err)

      patient.password = hash
      next()
    })
  })
})

PatientSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}

module.exports = PatientSchema