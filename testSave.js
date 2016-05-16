var crypto = require('crypto')
var bcrypt = require('bcryptjs')
var should = require('should')
var mongoose = require('mongoose')
var Patient = require('./app/model/patient')
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS");

var patient={
        IdCardNo: "lixinyi",
        password: 'password',
        firstName:'firstName',
        lastName:'lastName',
        gender:'felmale',
        birth:123,
        email:'396275915@qq.com',
        mobileNo:'mobileNo'
      }

 var _patient = new Patient(patient)
 _patient.save(function(err){
 	if(err){
 		console.log(err);
 	}

 	console.log("successfully");;
 });
