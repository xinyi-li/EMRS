var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var Index=require('../app/controller/index')
var Patient=require('../app/controller/patient')
var Doctor=require('../app/controller/doctor')
var MedicalRecords=require('../app/controller/medicalRecords')
var AWS = require("aws-sdk");
var cookieParser = require('cookie-parser')
var session = require('express-session')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports = function(app){

  app.use(function(req,res,next){
    var _patientInfo = req.session.patientInfo;
    app.locals.patientSession=_patientInfo;
    next();
  })

  app.get('/', Index.index);

  app.get('/signInPatient', Patient.signInPatient)
  app.post('/signInPatientHandler',urlencodedParser, MedicalRecords.checkRole, Patient.signInPatientHandler);
  app.get('/logout', Patient.logout)

  app.get('/signUpInputId', Patient.signUpShowInputId)
  app.post('/signUpInputHandler',urlencodedParser,Patient.signUpIfPatientInDatabase, Patient.signUpDetailsShow)
  app.post('/signUpInputDetailsHandler',urlencodedParser, Patient.signUpDetails)

  app.get('/signInDoctor', Doctor.signInDoctor);
  app.post('/signInDoctorHandler', urlencodedParser, MedicalRecords.checkRole, Doctor.signInDoctorHandler)
  // app.get('/patientInfoInDoctor', function(req, res){
  //   res.render('patientInfoInDoctor', {
  //     patient: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
  //   })
  // })

  app.get('/medicalRecords', urlencodedParser,MedicalRecords.checkRole,MedicalRecords.medicalRecordsByID);
  app.get('/addMedical', MedicalRecords.checkRole,MedicalRecords.checkTheState,MedicalRecords.addMedicalShow)
  app.post('/addMedicalHandler',urlencodedParser,MedicalRecords.checkRole,MedicalRecords.checkTheState, MedicalRecords.checkIsNewRecords, MedicalRecords.addMedicalHandler);
}
