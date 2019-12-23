
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var person=require('./Schemas/person');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

var urlencodedParser = bodyParser.urlencoded({ extended: true });


//route called on the time of login
router.all('/', urlencodedParser, function (req, res){

  console.log("The route at signup");
  var data={
    accountType:req.body.accType,    
    username:req.body.username,
    password:req.body.password
  };
  var newuser= new person(data);
    newuser.save()
    .then(()=>{
      console.log('user saved ' +newuser.accountType);
      res.redirect('/')})
    .catch((err)=>{
      console.log('error occured in faculty signup '+err);
      res.send(err);
    })
  /*if(req.body.accType=='faculty')
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
  }*/
    
  });
module.exports=router;




