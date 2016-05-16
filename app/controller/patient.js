var Patient=require("../model/patient")
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
  exports.signInPatient=function(req, res){
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
          return res.render('patientInfo', {patient: patientInfo, patientSession:req.session.patientInfo});
          //return res.send(patientInfo)
          //return res.redirect('/')
        }
        else {
          return res.redirect('/')
          //return res.send("password wrong");
          //console.log("password wrong");
        }
      })
    })
  };

  exports.logout= function(req, res){
    delete req.session.patientInfo;
    //delete app.locals.patientSession;
    res.redirect('/');
  }