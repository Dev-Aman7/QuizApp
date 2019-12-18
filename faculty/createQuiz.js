const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var mid=require('../middleware/middlewares')

var urlencodedParser = bodyParser.urlencoded({ extended: true });
//route called on the time of creation of Quiz by faculty
router.all('/', urlencodedParser,mid.formHandler, function (req, res){
    res.render('addquestions');
})
module.exports=router;