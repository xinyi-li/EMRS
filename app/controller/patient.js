var Patient=require("../model/patient")
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser');

exports.signInRequired=function(req,res,next){
  var _patientInfo = req.session.patientInfo;
  if (!_patientInfo) {
    return res.send("please log in")
  }
  next()
}

exports.signUpShowInputId=function(req, res){
    res.render('signUp_inputId')
  }

exports.signUpIfPatientInDatabase=function(req,res,next){
  var id = req.body.inputIdNo
  Patient.findOne({IdCardNo:id}, function(err, patientInfo){
    if(err){
      console.log(err);
    }
    if(patientInfo){
      return res.send("exsit user")
    }
    req.inputId=id;//???
    next();
  })
}

exports.signUpDetailsShow=function(req,res){
  var id=req.inputId;
  console.log(id);
  if(id){
    req.session.InputId=id;
    res.render('signUp_details')
  }
  else{
    res.send("please input your id first")
  }
}

exports.signUpDetails=function(req,res){
  var _patientDetail=req.body.patientDetail;

  var IdCardNo=req.session.InputId
  delete req.session.InputId
  console.log(IdCardNo);
  var password=_patientDetail.password
  var rePassword=_patientDetail.rePassword
  var firstName=_patientDetail.firstName
  var lastName=_patientDetail.lastName
  var gender=_patientDetail.gender
  var birth=_patientDetail.birth
  var email=_patientDetail.email
  var mobileNo=_patientDetail.mobileNo

  if(password!=rePassword){
    res.send("two password is not the same")
  }

  if(!password||!rePassword||!firstName||!lastName||!gender||!birth||!email||!mobileNo){
    console.log(!password||!rePassword||!firstName||!lastName||!gender||!birth||!email||!mobileNo);
    console.log(password);
    console.log(rePassword);
    console.log(firstName);
    console.log(lastName);
    console.log(gender);
    console.log(birth);
    console.log(email);
    console.log(mobileNo);
    res.send("please complete the form")
  }
  else{
    var patient={
            IdCardNo: IdCardNo,
            password: password,
            firstName:firstName,
            lastName: lastName,
            gender: gender,
            birth:birth,
            email:email,
            mobileNo:mobileNo,
          }

     var _patient = new Patient(patient)
     _patient.save(function(err){
      if(err){
        console.log(err);
        res.send(err)
      }
      else{
         res.send("sign up successfully")
      }
     
     });
  }
}

exports.signInPatient=function(req, res){
  var _patientInfo=req.session.patientInfo
  if(_patientInfo)
     res.render('patientInfo', {patient: _patientInfo, patientSession:_patientInfo});
  else
    res.render('signInPatient');
}

exports.signInPatientHandler= function(req, res) {
  var IdCardNo = req.body.IdCardNo
  var password = req.body.password
  Patient.findOne({IdCardNo: IdCardNo}, function(err, patientInfo) {
    if (err) {
      console.log(err)
    }
    if (!patientInfo) {
      return res.send("no such user")
    }
    patientInfo.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }
      if (isMatch) {
        req.session.patientInfo = patientInfo
        return res.render('patientInfo', {patient: patientInfo, patientSession:req.session.patientInfo});
      }
      else {
        return res.send("wrong password")
      }
    })
  })
};

exports.logout= function(req, res){
  delete req.session.patientInfo;
  res.redirect('/');
}