var AWS = require("aws-sdk");

AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
var params0 = {
    TableName : "MedicalRecords"
};

dynamodb.deleteTable(params0, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

var params = {
    TableName : "MedicalRecords",
    KeySchema: [       
        { AttributeName: "PatientLinkId", KeyType: "HASH"},  //Partition key
        { AttributeName: "DoctorLinkId", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "PatientLinkId", AttributeType: "S" },
        { AttributeName: "DoctorLinkId", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
