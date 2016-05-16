var mongoose = require('mongoose')
var PatientSchema = require('./schema/patient')
var Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient

