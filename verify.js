const express = require("express");
const mid=require('./middlewares');
var localStorage=require('localStorage');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var sess;
// Display the dashboard page
router.all('/', urlencodedParser,mid.formHandler,function (req, res,next){
    //result=out();
    var result=JSON.parse(localStorage.getItem('Quiz'));
    var count=0;
    console.log(result);
    result.forEach((element,index) => {
        console.log(req.body['Q'+index]+"   "+element.answer)
        if(element.answer==req.body['Q'+index])
        {
            count++;
        }
        
    });
    localStorage.removeItem('Quiz');
    res.render('result',{result : count});
    //res.send(req.body);
    //res.redirect('/res');
   });

module.exports = router;
