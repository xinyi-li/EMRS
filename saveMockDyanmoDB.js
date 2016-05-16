var AWS = require("aws-sdk");

AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "MedicalRecords";


var mock = "The Big New Movie";

// var params = {
//     TableName:table,
//     Item:{
//         "PatientLinkId": "123",
//         "DoctorLinkId": "456",
//         "DoctorFirstName":mock,
//         "Hospital":mock,
//         "Records":[
//             {
//                 "Symptom":mock,
//                 "InspectionItems":mock,
//                 "InspectionResults":mock,
//                 "Diagnose":mock,
//                 "Prescriptions":mock,
//                 "CreateAt":mock,
//                 "UpdatedAt":mock,
//             }
//         ]
//     }
// };

// var params2 = {
//     TableName:table,
//     Item:{
//         "PatientLinkId": "123",
//         "DoctorLinkId": "789",
//         "DoctorFirstName":mock,
//         "Hospital":mock,
//         "Records":[
//             {
//                 "Symptom":mock,
//                 "InspectionItems":mock,
//                 "InspectionResults":mock,
//                 "Diagnose":mock,
//                 "Prescriptions":mock,
//                 "CreateAt":mock,
//                 "UpdatedAt":mock,
//             },
//             {
//                 "Symptom":mock,
//                 "Inspection Items":mock,
//                 "Inspection Results":mock,
//                 "Diagnose":mock,
//                 "Prescriptions":mock,
//                 "CreateAt":mock,
//                 "UpdatedAt":mock,
//             } 
//         ]
//     }
// };

// console.log("Adding a new item...");
// docClient.put(params, function(err, data) {
//     if (err) {
//         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Added item:", JSON.stringify(data, null, 2));
//     }
// });

// docClient.put(params2, function(err, data) {
//     if (err) {
//         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Added item:", JSON.stringify(data, null, 2));
//     }
// });

// console.log("successfully!");

function findData(items){
    items.forEach(function(item){
        var _records=item.Records;
        for(var i=0;i<_records.length;i++){
            console.log(_records[i].Symptom);
        }
    })
}
var params3 = {
        TableName : "MedicalRecords",
        KeyConditionExpression: "#id = :idValue",
        ExpressionAttributeNames:{
            "#id": "PatientLinkId"
        },
        ExpressionAttributeValues: {
            ":idValue":"123"
        }
    };

    docClient.query(params3, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");

            findData(data.Items);
        }
    });