var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/EMRS");
var TestSchema = new mongoose.Schema({
    name : String,
    age : {type:Number,default:0},
    email : {type:String},
    time : {type:Date,default:Date.now}
});
var TestModel = db.model("test1",TestSchema); //'test'相当于collection
var TestEntity = new TestModel({
    name:'helloworld',
    age:28,
    emial:'helloworld@qq.com'
});
TestEntity.save(function(err,doc){
    if(err){
        console.log("error :" + err);
    } else {
        console.log(doc);
    }
});