var express = require('express');
var app= express();
var path = require('path');
app.listen(3001);
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS");

app.set('view engine', 'pug');
app.set('views', __dirname + '/app/views/pages');
app.use(express.static(path.join(__dirname, '/app/public')));
app.locals.moment=require('moment');

var title='QM EMS System'

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
		title:title
	});
});

app.get('/patientInfo', function(req, res){
	res.render('patientInfo', {
		title: title,
		user: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
	})
})

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

app.get('/patientInfoInDoctor', function(req, res){
	res.render('patientInfoInDoctor', {
		title: title,
		user: {id: "1", lastName: "xinyi", firstName:"li", mobileNo:+8615828006196, gender: "female", birth: "1994.08.08", email:"396275915@qq.com", createAt:"2015.01.01", updateAt:"2016.02.01"}
	})
})

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