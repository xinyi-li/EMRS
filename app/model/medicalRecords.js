
var AWS = require("aws-sdk");

AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var tableName="MedicalRecords"
exports.queryParm = function(IdCardNo){
    return params = {
        TableName : tableName,
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
        TableName:tableName,
        Item:{
            "PatientLinkId": receiveInfo.PatientLinkId,
            "DoctorLinkId": receiveInfo.DoctorLinkId,
            "DoctorFirstName":receiveInfo.DoctorFirstName,
            "DoctorLastName":receiveInfo.DoctorLastName,
            "Hospital":receiveInfo.Hospital,
            "Records":receiveInfo.Records
        }
    };
}