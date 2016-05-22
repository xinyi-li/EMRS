var mongoose = require('mongoose')
var DoctorSchema = require('./schema/doctor')
var Doctor = mongoose.model('Doctor', DoctorSchema)

module.exports = Doctor

