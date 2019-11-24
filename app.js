var http = require("http");
var express = require('express');
var session=require('express-session');
var fs=require('fs');
var createQuiz=require('./createQuiz');
var addQuiz=require('./addQuiz')
var app = express();
var bodyParser = require('body-parser');


var middleware=require('./middlewares')

var verify=require('./verify');
var auth=require('./auth');
var signup=require('./signup');
//var quiz=require('./views/quizschema');
//var createQuiz=require('./createQuiz');

app.set('view engine','ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(session({secret: 'user'}));
app.use(express.static("public"));

app.get('/home',middleware.formHandler,function(req,res){
    res.sendFile(__dirname+'/public/Home.html');
});
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/login.html');
});
app.use('/auth',auth);

app.get('/views/myscript.js', function(req, res) {
    res.sendFile(__dirname + '/views/myscript.js');
});

app.use('/verify',verify);

app.use('/signup',signup);

app.use('/addQuiz',addQuiz);

app.use('/createQuiz',createQuiz);
app.listen(3000,(req,res)=>{
    console.log("Server running on 3000");
});
