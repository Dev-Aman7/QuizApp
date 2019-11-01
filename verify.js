const express = require("express");
const mid=require('./middlewares');

const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var sess;
// Display the dashboard page
router.all('/', urlencodedParser,mid.formHandler,function (req, res,next){
    //result=out();
    count=0;
    r1="red";r2="red";r3="red";r4="red";
    if(req.body.Q1=='a')
    {
        r1="green";
        count++;
    }
    if(req.body.Q2=='a')
    {
        r2="green";
        count++;
    }
    if(req.body.Q3=='a')
    {
        r3="green";
        count++;
    }
    if(req.body.Q4=='a')
    {
        r4="green";
        count++;
    }
    //res.send(req.body);
    res.render('result',{res: count, re1: r1,re2: r2,re3: r3,re4: r4});
    //res.redirect('/res');
   });

module.exports = router;
