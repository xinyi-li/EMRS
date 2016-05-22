var mongoose = require('mongoose')
var PatientSchema = require('./schema/patient')
var Doctor = mongoose.model('Doctor', DoctorSchema)

module.exports = Doctor

