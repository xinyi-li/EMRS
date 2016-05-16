var express = require('express');
var app= express();
var path = require('path');
app.listen(3001);
var mongoose = require("mongoose");
var Patient=require("./app/model/patient")
var linkMongoDB="mongodb://127.0.0.1:27017/EMRS"
var db = mongoose.connect(linkMongoDB);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
var AWS = require("aws-sdk");

AWS.config.update({
  region: "cn-north-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

var queryModel=require("./app/model/medicalRecords")


app.set('view engine', 'pug');
app.set('views', __dirname + '/app/views/pages');
app.use(express.static(path.join(__dirname, '/app/public')));
app.locals.moment=require('moment');

var title='QM EMS System'
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(session({
  secret: 'lixinyi', 
  resave: false,
  cookie: { maxAge: 60 * 1000 },
  saveUninitialized: false,
  store: new MongoStore({ url:linkMongoDB })
}));
require('./config/router')(app);
console.log(path.join(__dirname, 'public'));
console.log("server start at port 3000");