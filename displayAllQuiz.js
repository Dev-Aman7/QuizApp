var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var quizes=require('./Schemas/quizschema')
mongoose.connect("mongodb://localhost:27017/Quiz",{ useNewUrlParser: true });
var url = "mongodb://localhost:27017/Quiz";

router.all('/',urlencodedParser,function(req,res){
    mongoose.connect(url);
    quizes.remove({})
    {
        console.log('removed');
    }
    quizes.find({},(err,result)=>
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(result);
        }
        
    });
    
});

module.exports=router;