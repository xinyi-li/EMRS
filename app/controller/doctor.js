var Doctor=require("../model/doctor")
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser');

exports.signInRequired=function(req,res,next){
  var _doctorInfo = req.session.doctorInfo;
  if (!_doctorInfo) {
    return res.send("please log in")
  }
  next()
}

exports.signInDoctorHandler= function(req, res) {
  var doctorId = req.body.doctorId
  var doctorPassword = req.body.doctorPassword
  Doctor.findOne({doctorId: doctorId}, function(err, doctorInfo) {
    if (err) {
      console.log(err)
    }
    if (!doctorInfo) {
      return res.send("no such user")
    }
    doctorInfo.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }
      if (isMatch) {
        req.session.doctorInfo = doctorInfo
        return res.render('patientAuthorize');
      }
      else {
        return res.send("wrong password")
      }
    })
  })
};

exports.logout= function(req, res){
  delete req.session.DoctorInfo;
  res.redirect('/');
}