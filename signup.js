
const express = require("express");
var app=express();
const router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var add=function(req,res,next)
{

    /*MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var data={
            '_id':1,
            'name':req.body.fname,
            'date':req.body.pass
        };
        dbo.collection("customers").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });*/
      console.log('here');
      next();
}

router.post('/', urlencodedParser,add, function (req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var data={
           
            name:req.body.fname,
            pass:req.body.pass
        };
        dbo.collection("users").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
      res.redirect('/');
   });
module.exports=router;




