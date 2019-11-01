var http = require("http");
var express = require('express');

var middleware=require('./middlewares')
var session=require('express-session');
var verify=require('./verify');
var auth=require('./auth');
var signup=require('./signup');
var fs=require('fs');
var app = express();
var bodyParser = require('body-parser');

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

app.use('/verify',verify);

app.use('/signup',signup);

app.listen(3000,(req,res)=>{
    console.log("Server running on 3000");
});
