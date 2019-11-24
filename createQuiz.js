const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var fs=require('fs')
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.all('/', urlencodedParser, function (req, res){
    res.render('addquestions');
})
module.exports=router;