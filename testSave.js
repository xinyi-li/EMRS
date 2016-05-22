var crypto = require('crypto')
var bcrypt = require('bcryptjs')
var should = require('should')
var mongoose = require('mongoose')
var Patient = require('./app/model/patient')
var Doctor=require('./app/model/doctor')
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS");

// var patient={
//         IdCardNo: "lixinyi",
//         password: 'password',
//         firstName:'firstName',
//         lastName:'lastName',
//         gender:'felmale',
//         birth:"123",
//         email:'396275915@qq.com',
//         mobileNo:'mobileNo',
//         linkDynamoDB:'123'
//       }

//  var _patient = new Patient(patient)
//  _patient.save(function(err){
//     if(err){
//         console.log(err);
//     }
// console.log("successfully");
//  });
var doctor={
    doctorId: "xinyi.li",
    password: "password",
    firstName:"xinyi",
    lastName:"li",
    hospital:"Xiehe",
    gender:"male",
    birth:"1990.09.07",
    email:"xinyi.liDoctor@xiehe.com",
    mobileNo:"135423579345",
}

var _doctor=new Doctor(doctor)
_doctor.save(function(err){
    if(err){
        console.log(err);
    }
console.log("successfully");
});

 	
