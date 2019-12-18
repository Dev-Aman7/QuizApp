var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var quizes=require('../Schemas/quizschema')
mongoose.connect("mongodb://localhost:27017/Quiz",{ useNewUrlParser: true });
var url = "mongodb://localhost:27017/Quiz";

router.all('/',urlencodedParser,function(req,res){
    mongoose.connect(url);
    //for clearing db(Be careful);
    // quizes.remove({},(err)=>
    // {
    //     if(err)
    //     {
    //         console.log("error while removing : "+err);
    //         res.send(err);
    //     }
    //     else
    //     {
    //         console.log('removed');
    //         res.send("done");
    //     }
    // });
    quizes.find({},(err,result)=>{
        if(err)
        {
            res.send('err')
        }
        else
        res.render('allQuizes',{data:result})
    });
    // quizes.find({})
    // .populate({
    //     path: 'questionID',
    //     select :"question answer"})
    // .exec(function (err, Quiz) {
    //     if (err) {
    //         //res.send('some error');
    //     }
    //     else
    //     {
    //         console.log(Quiz);
    //         res.render('allQuizes',{data: Quiz})
    //     }
        
    // });
    
});

module.exports=router;