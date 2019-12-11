var mongoose=require('mongoose');
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var std=require('./Schemas/studentSchema');
var fct=require('./Schemas/facultySchema');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Quiz";


var sess;

router.post('/', urlencodedParser, function (req, res){
    console.log('login auth');
    mongoose.connect("mongodb://localhost:27017/Quiz",{ useNewUrlParser: true });
    // MongoClient.connect(url, function(err, db) {
    // if (err) throw err;
    // var dbo = db.db("Quiz");
    var query = { username: req.body.username , password: req.body.password};
    console.log(req.body.username+" "+req.body.password);
    if(req.body.accType=='student')
    {
        std.findOne(query,function(err, result) {
            if (err) throw err;
            if(result==null)
            {
                console.log("could not find student");
                res.redirect('/');
            }
            else
            {
                sess=req.session;
                sess.username=req.body.username;
                sess.password=req.body.password;
                res.redirect('/displayAllQuiz');
                //res.sendFile(__dirname+'/public/Home.html');
            }
            console.log(result);
        });
    }
    else
    {
        fct.findOne(query,function(err, result) 
        {
            if (err) throw err;
            if(result==null)
            {
                console.log("could not find faculty");
                res.redirect('/');
            }
            else
            {
                sess=req.session;
                sess.name=req.body.name;
                sess.pass=req.body.pass;
                res.redirect('/createQuiz');
            }
            console.log(result);

        });
    }
    mongoose.connection.close();
});


router.get('/',function(req,res){
res.redirect('/')
})

module.exports=router;