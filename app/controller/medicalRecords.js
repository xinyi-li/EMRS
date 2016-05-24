// var urlencodedParser = bodyParser.urlencoded({ extended: true })
var MedicalRecordsParam=require("../model/medicalRecords")
var AWS = require("aws-sdk");
var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: true })
AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();
exports.checkRole=function(req,res,next){
  var _doctorInfo=req.session.doctorInfo;
  var _patientInfo=req.session.patientInfo;

  if(_patientInfo&&!_doctorInfo){
    delete req.session.patientInfoInDoctor;
    next();
  }
  else if(_doctorInfo&&!_patientInfo){
    next();
  }
  else if(!_doctorInfo&&!_patientInfo){
    next();
  }
  else{
    console.log("doctor is"+ _doctorInfo);
    console.log("patient is "+ _patientInfo);
    res.send("please be sure of your role")
  }
}
exports.medicalRecordsByID=function(req, res) {
  var _doctorInfo=req.session.doctorInfo;
  var _patientInfo=req.session.patientInfo;
  var _patientInfoInDoctor=req.session.patientInfoInDoctor;
  if(_patientInfo){
    var linkDynamoDBId=_patientInfo.linkDynamoDB
    var paramter=MedicalRecordsParam.queryParm(linkDynamoDBId)
    docClient.query(paramter, function(err, data) {
      if (err) {
          console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
          console.log("Query succeeded.");
          res.render('medicalRecords', {Info: data.Items});
        }
    });
  }
  else{
    if(!_patientInfoInDoctor&&_doctorInfo){
      res.send("please get the patient's authority")
    }

    else if(_patientInfoInDoctor&&_doctorInfo){
      delete req.session.patientInfoInDoctor;
      delete req.session.doctorInfo;
      var linkDynamoDBId=_patientInfoInDoctor.linkDynamoDB
      var paramter=MedicalRecordsParam.queryParm(linkDynamoDBId)
      docClient.query(paramter, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            res.render('medicalRecords', {Info: data.Items});
          }
      });
    }
    else{
      res.send("please log in")
    }
  }
};

exports.addMedicalShow=function(req,res){
  var _doctorInfo=req.session.doctorInfo;
  var _patientInfoInDoctor=req.session.patientInfoInDoctor;
  if(_doctorInfo&&_patientInfoInDoctor){
    res.render('addMedicalRecords',{doctor: _doctorInfo})
  }
  else{
    res.send("please login")
  }
}

exports.checkTheState=function(req,res,next){
  var _doctorInfo=req.session.doctorInfo;
  var _patientInfoInDoctor=req.session.patientInfoInDoctor;
  if(_patientInfoInDoctor&&!_doctorInfo){
    res.send("only doctor can add records")
  }
  else if(!_patientInfoInDoctor&&_doctorInfo){
    res.send("please get the patient's authority")
  }

  else if(_patientInfoInDoctor&&_doctorInfo){
    next();
  }
  else{
    res.send("please log in")
  }
}

exports.checkIsNewRecords=function(req,res,next){
  var _patientInfoInDoctor=req.session.patientInfoInDoctor;
  console.log(_patientInfoInDoctor.linkDynamoDB);
  var paramter=MedicalRecordsParam.queryParm(_patientInfoInDoctor.linkDynamoDB)

  docClient.query(paramter, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        //console.log("real data is" + data.Items);
        console.log("items is"+data.Items);
        if(data.Items==""){
          console.log("i'm here");
          next();
        }
        else{
          req.dynamodbData=data.Items;
          next();
        }
      }
  });
}

exports.addMedicalHandler=function(req, res) {
  var _doctorInfo=req.session.doctorInfo;
  var _patientInfoInDoctor=req.session.patientInfoInDoctor;

  delete req.session.patientInfo;
  delete req.session.patientInfoInDoctor;
  delete req.session.doctorInfo;
  var records=req.body.records;
  var postInfo=new Object();
  var recordsList=new Array();
 // console.log("in session"+ _patientInfoInDoctor.linkDynamoDB);
  postInfo.PatientLinkId=_patientInfoInDoctor.linkDynamoDB;
  postInfo.DoctorLinkId=_doctorInfo.linkDynamoDB;
  postInfo.DoctorFirstName=_doctorInfo.firstName;
  postInfo.DoctorLastName=_doctorInfo.lastName;
  postInfo.Hospital=_doctorInfo.hospital;
  records.CreateAt=Date.now();
  records.UpdateAt=Date.now();

  data=req.dynamodbData;
  if(data){
    for(var i=0;i<data.length;i++){
    recordData=data[i];
    recordsList=recordData.Records;
    console.log("data is "+recordData.Records);
    if(!recordsList){
      recordsList=new Array();
    }  
    recordsList.push(records)
    console.log(recordsList);
    postInfo.Records=recordsList;

    console.log(postInfo);
    var params=MedicalRecordsParam.createMedicalRecord(postInfo)
    console.log(params);
    console.log("Adding a new item...");


    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("saved successfully!")
        }
      });
    }
  }
  else{
    recordsList=new Array();
    recordsList.push(records)
    postInfo.Records=recordsList;
    var params=MedicalRecordsParam.createMedicalRecord(postInfo)
    console.log(params);
    console.log("Adding a new item...");


    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("saved successfully!")
        }
      });
  }


  delete req.dynamodbData;

};