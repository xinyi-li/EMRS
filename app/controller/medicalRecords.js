// var urlencodedParser = bodyParser.urlencoded({ extended: true })
var queryModel=require("../model/medicalRecords")
var AWS = require("aws-sdk");
var urlencodedParser = bodyParser.urlencoded({ extended: true })
AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();
exports.medicalRecordsByID=function(req, res) {
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
    

  };

  exports.addMedicalHandler=function(req, res) {
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
  };

  exports.addMedicalRecords=function(req, res){
    res.render('addMedicalRecords', {
      title: title,
      item: {id: "1", doctorLastName: "xinyi", doctorFirstName:"li", hospital:"li"}
    })
  }