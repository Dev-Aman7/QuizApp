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
    if(req.body.Q1=='a')
    {
        count++;
    }
    if(req.body.Q2=='a')
    {
        count++;
    }
    if(req.body.Q3=='a')
    {
        count++;
    }
    if(req.body.Q4=='a')
    {
        count++;
    }
    //res.send(req.body);
    res.render('result',{res: count});
    //res.redirect('/res');
   });

module.exports = router;
