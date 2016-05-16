var express = require('express');
var app= express();
var path = require('path');
app.listen(3001);
var mongoose = require("mongoose");
var Patient=require("./app/model/patient")
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS");
var bodyParser = require('body-parser');
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.set('view engine', 'pug');
app.set('views', __dirname + '/app/views/pages');
app.use(express.static(path.join(__dirname, '/app/public')));
app.locals.moment=require('moment');

var title='QM EMS System'
var urlencodedParser = bodyParser.urlencoded({ extended: true })

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

    console.log('patient info is ' + patientInfo)
    patientInfo.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (isMatch) {
        //req.session.patientInfo = patientInfo
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

/*app.get('/patientInfo', function(req, res){
	res.render('patientInfo', {
		title: title,
		patientInfo: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
	})
})
*/

app.get('/medicalRecords', function(req, res){
	res.render('medicalRecords', {
		title: title,
		records: [
		{id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"},
		{id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"},
		{id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"},
		]
	})
})

// app.get('/patientInfoInDoctor', function(req, res){
// 	res.render('patientInfoInDoctor', {
// 		title: title,
// 		patient: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
// 	})
// })

app.get('/patientInfoInDoctor:IdCardNo', function(req, res) {
	var params = {
    TableName : "MedicalRecords",
    KeyConditionExpression: "#id = :idValue and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#id": "PatientLinkId"
    },
    ExpressionAttributeValues: {
        ":idValue":"123"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title
            + " ... " + item.info.genres
            + " ... " + item.info.actors[0]);
        });
    }
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
console.log(path.join(__dirname, 'public'));
console.log("server start at port 3000");