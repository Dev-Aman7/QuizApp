
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var sess;

router.post('/', urlencodedParser, function (req, res){
    console.log('login auth');

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { name: req.body.name , pass: req.body.pass};
    console.log(req.body.name+" "+req.body.pass);
    dbo.collection("users").findOne(query,function(err, result) {
        if (err) throw err;
        if(result==null)
        {
            console.log("could not find");
            res.redirect('/');
        }
        else
        {
            sess=req.session;
            sess.name=req.body.name;
            sess.pass=req.body.pass;
            res.sendFile(__dirname+'/public/Home.html');
        }
        console.log(result);
        db.close();
    });
    });

    /*var reply='';
    if(req.body.name=="Aman" && req.body.pass=="dev")
    {
        sess=req.session;
        sess.name=req.body.name;
        sess.pass=req.body.pass;
        res.redirect('/home');
    }
    else
    res.redirect('/');
    //res.redirect('/res');*/
   });

router.get('/',function(req,res){
res.redirect('/');
})
module.exports=router;