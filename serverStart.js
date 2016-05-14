var express = require('express');
var app= express();
var path = require('path');
app.listen(3000);

app.set('views', './app/views/pages');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment=require('moment')

app.get('/', function (req, res) {
  res.render('index', {
  	title: 'QM EMS System'
  });
});

app.get('/signIn', function(req, res){
	res.render('signIn', {
		title:'QM EMS System'
	});
});

console.log("server start at port 3000");