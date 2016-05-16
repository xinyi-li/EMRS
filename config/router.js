var mongoose = require("mongoose");
var Patient=require("../app/model/patient")
var bodyParser = require('body-parser');

var AWS = require("aws-sdk");

var title='QM EMS System'
var urlencodedParser = bodyParser.urlencoded({ extended: true })

AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var queryModel=require("../app/model/medicalRecords")

module.exports = function(app){

  app.use(function(req,res,next){
  var _patientInfo = req.session.patientInfo;
  console.log("in session:"+req.session.patientInfo);

  if (_patientInfo) {
    app.locals.patientSession=_patientInfo;
  }

  return next()
})
  app.get('/', function (req, res) {
    res.render('index', {
      title: title
    });
  });

  app.get('/signInDoctor', function(req, res){
    res.render('signInDoctor', {
      title: title
    });
  });

  app.get('/signInPatient', function(req, res){
    res.render('signInPatient', {
      title: title
    });
  });

  app.post('/user/signInPatientHandler',urlencodedParser, function(req, res) {
    var IdCardNo = req.body.IdCardNo
    var password = req.body.password

    Patient.findOne({IdCardNo: IdCardNo}, function(err, patientInfo) {
      if (err) {
        console.log(err)
      }

      if (!patientInfo) {
        return res.redirect('/')
        //return res.send(IdCardNo+password)
        //console.log('no such user')
      }

      //console.log('patient info is ' + patientInfo)
      patientInfo.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log(err)
        }

        if (isMatch) {
          req.session.patientInfo = patientInfo
          //console.log("in session:"+req.session.patientInfo);
          //return res.send("success!");
          //return res.render('patientInfo', {patient: patientInfo});
          //return res.send(patientInfo)
          return res.redirect('/')
        }
        else {
          return res.redirect('/')
          //return res.send("password wrong");
          //console.log("password wrong");
        }
      })
    })
  });

  app.get('/logout', function(req, res){
    delete req.session.patientInfo;
    delete app.locals.patientSession;
    res.redirect('/');
  })

  /*app.get('/patientInfo', function(req, res){
    res.render('patientInfo', {
      title: title,
      patientInfo: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
    })
  })
  */

  // app.get('/medicalRecords', function(req, res){
  //  res.render('medicalRecords', {
  //    title: title,
  //    records: [
  //    {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"},
  //    {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"},
  //    {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"},
  //    ]
  //  })
  // })

  app.get('/patientInfoInDoctor', function(req, res){
    res.render('patientInfoInDoctor', {
      title: title,
      patient: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
    })
  })




  app.get('/medicalRecords/:IdCardNo', function(req, res) {
    var IdCardNo = req.params.IdCardNo
    var paramter=queryModel.queryParm(IdCardNo);
    
    docClient.query(paramter, function(err, data) {
          if (err) {
              console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
          } else {
              console.log("Query succeeded.");
              res.render('medicalRecords', {records: data.Items});
          }
      });
    

  });

  app.post('/user/addMedicalHandler',urlencodedParser, function(req, res) {
    var IdCardNo = req.body.records
    var password = req.body.password

    Patient.findOne({IdCardNo: IdCardNo}, function(err, patientInfo) {
      if (err) {
        console.log(err)
      }

      if (!patientInfo) {
        return res.redirect('/')
        //return res.send(IdCardNo+password)
        //console.log('no such user')
      }

      console.log('patient info is ' + patientInfo)
      patientInfo.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log(err)
        }

        if (isMatch) {
          req.session.patientInfo = patientInfo
          //return res.send("success!");
          return res.render('patientInfo', {patient: patientInfo});
          //return res.send(patientInfo)
        }
        else {
          return res.redirect('/')
          //return res.send("password wrong");
          //console.log("password wrong");
        }
      })
    })
  });

  app.get('/addMedicalRecords', function(req, res){
    res.render('addMedicalRecords', {
      title: title,
      item: {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"}
    })
  })

  app.get('/signUpInput', function(req, res){
    res.render('signUp_inputId', {
      title: title,
      item: {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"}
    })
  })
}
