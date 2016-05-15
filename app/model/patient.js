var mongoose = require('mongoose')
var PatientSchema = require('schemas/user')
var Patient = mongoose.model('User', PatientSchema)

module.exports = Patient

