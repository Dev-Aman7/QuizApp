const express = require("express");
const mid=require('../middleware/middlewares');
var localStorage=require('localStorage');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var sess;
// Display the dashboard page
router.all('/', urlencodedParser,mid.formHandler,async function (req, res,next){
    //result=out();
    console.log(localStorage.getItem('Quiz'));
    var result=JSON.parse(localStorage.getItem('Quiz'));
    var count=0;
    console.log(result);
    let d= await result.forEach((element,index) => {
        console.log('request is', req.body);
        console.log('Q'+index);
        console.log(req.body['Q'+index]+"   "+element.answer)
        if(element.answer==req.body['Q'+index])
        {
            count++;
        }
        
    });
    //localStorage.removeItem('Quiz');
    res.render('result',{result : count});
    //res.send(req.body);
    //res.redirect('/res');
   });

module.exports = router;
