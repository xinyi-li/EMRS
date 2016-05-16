
var AWS = require("aws-sdk");

AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.queryParm = function(IdCardNo){
    return params = {
        TableName : "MedicalRecords",
        KeyConditionExpression: "#id = :idValue",
        ExpressionAttributeNames:{
            "#id": "PatientLinkId"
        },
        ExpressionAttributeValues: {
            ":idValue":IdCardNo
        }
    };
}
exports.createMedicalRecord = function(receiveInfo){
    return params = {
        TableName:table,
        Item:{
            "PatientLinkId": receiveInfo.PatientLinkId,
            "DoctorLinkId": receiveInfo.DoctorLinkId,
            "DoctorFirstName":receiveInfo.DoctorFirstName,
            "Hospital":receiveInfo.Hospital,
            "Records":receiveInfo.Records
        }
    };
}