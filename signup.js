
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var facultySignUp=require('./Schemas/facultySchema');
var studentSignUp=require('./Schemas/studentSchema');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/Quiz");



router.all('/', urlencodedParser, function (req, res){

  if(req.body.accType=='faculty')
  {
    var data={
        
      username:req.body.username,
      password:req.body.password
    };
    
    var newuser= new facultySignUp(data);
    newuser.save()
    .then(()=>{
      console.log('faculty saved ' +newuser);
      res.redirect('/')})
    .catch((err)=>{
      console.log('error occured in faculty signup '+err);
      res.send(err);
    })
  }
  else
  {
   
    var data={
        
      username:req.body.username,
      password:req.body.password
    };
    
    var newuser= new studentSignUp(data);
    newuser.save()
    .then(()=>{
      console.log('studuser saved ' +newuser);
      res.redirect('/')})
    .catch((err)=>{
      console.log('error occured in student signup '+err);
      res.send(err);
    })
  }
    
  });
module.exports=router;




