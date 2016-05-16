var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var Index=require('../app/controller/index')
var Patient=require('../app/controller/patient')
var MedicalRecords=require('../app/controller/medicalRecords')
var AWS = require("aws-sdk");
var urlencodedParser = bodyParser.urlencoded({ extended: true })
AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports = function(app){
  app.use(function(req,res,next){
  var _patientInfo = req.session.patientInfo;
  //console.log("in session:"+req.session.patientInfo);

  app.locals.patientSession=_patientInfo;
  next();
})

  app.get('/', Index.index);

  app.get('/signInPatient', Patient.signInPatient)
  app.post('/user/signInPatientHandler',urlencodedParser, Patient.signInPatientHandler);
  app.get('/logout', Patient.logout)

  app.get('/signInDoctor', function(req, res){
    res.render('signInDoctor');
  });
  app.get('/patientInfoInDoctor', function(req, res){
    res.render('patientInfoInDoctor', {
      patient: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
    })
  })




   app.get('/user/medicalRecords/:IdCardNo', MedicalRecords.medicalRecordsByID);
  app.post('/user/addMedicalHandler',urlencodedParser,MedicalRecords.addMedicalHandler);
  app.get('/addMedicalRecords', MedicalRecords.addMedicalRecords)

  app.get('/signUpInput', function(req, res){
    res.render('signUp_inputId', {
      title: title,
      item: {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"}
    })
  })
}
