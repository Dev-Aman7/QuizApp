var mongoose=require('mongoose');
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var person=require('./Schemas/person');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// var MongoClient = require('mongodb').MongoClient;



var sess;
//route called on the time of login of account 
router.post('/', urlencodedParser, function (req, res){
    console.log('login auth');
    // MongoClient.connect(url, function(err, db) {
    // if (err) throw err;
    // var dbo = db.db("Quiz");
    var query = { username: req.body.username , password: req.body.password, accountType:req.body.accType };
    console.log(req.body.username+" "+req.body.password);
    person.findOne(query,function(err, result) {
        if (err) throw err;
        if(result==null)
        {
            console.log("could not find user");
            res.redirect('/');
        }
        else
        {
            sess=req.session;
            sess.username=req.body.username;
            sess.password=req.body.password;
            console.log(result.accountType);
            if(result.accountType==='student')
                res.redirect('/displayAllQuiz');
            else
                res.redirect('/createQuiz');
            //res.sendFile(__dirname+'/public/Home.html');
        }
        console.log(result);
    });
    // if(req.body.accType=='student')
    // {
    //     std.findOne(query,function(err, result) {
    //         if (err) throw err;
    //         if(result==null)
    //         {
    //             console.log("could not find student");
    //             res.redirect('/');
    //         }
    //         else
    //         {
    //             sess=req.session;
    //             sess.username=req.body.username;
    //             sess.password=req.body.password;
    //             res.redirect('/displayAllQuiz');
    //             //res.sendFile(__dirname+'/public/Home.html');
    //         }
    //         console.log(result);
    //     });
    // }
    // else
    // {
    //     fct.findOne(query,function(err, result) 
    //     {
    //         if (err) throw err;
    //         if(result==null)
    //         {
    //             console.log("could not find faculty");
    //             res.redirect('/');
    //         }
    //         else
    //         {
    //             sess=req.session;
    //             sess.name=req.body.name;
    //             sess.pass=req.body.pass;
    //             res.redirect('/createQuiz');
    //         }
    //         console.log(result);
    //     });
    // }
});


router.get('/',function(req,res){
res.redirect('/')
})

module.exports=router;