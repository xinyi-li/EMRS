var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10
var crypto=require('crypto')

function getRandomString(len) {
  if (!len) len = 16

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex')
}

var DoctorSchema = new mongoose.Schema({
  doctorId: {
    unique: true,
    type: String
  },
  password: String,
  firstName:String,
  lastName:String,
  hospital:String,
  gender:String,
  birth:String,
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
  },
  linkDynamoDB: {
    unique:true,
    type:String
  }
})

DoctorSchema.pre('save', function(next) {
  var doctor = this

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(doctor.password, salt, function(err, hash) {
      if (err) return next(err)

      doctor.password = hash
      next()
    })
  })

  this.linkDynamoDB=getRandomString();
})

DoctorSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}

module.exports = DoctorSchema