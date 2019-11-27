var express = require("express");
var qus=require('./Schemas/questionsSchema');
var quiz=require('./Schemas/quizschema');
var bodyParser = require('body-parser');
var router=express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var mongoose=require('mongoose');

dataall={};
router.all('/',urlencodedParser,async (req,res)=>{
    mongoose.connect("mongodb://localhost:27017/Quiz",{ useNewUrlParser: true });
    dataall=req.body;
    count=req.body.count;
    data={};
    quesId=[];
    // console.log(quesId);
    for(i=1;i<=count;i++)
    {
        console.log('init '+i);
        s="q"+i;
        // console.log('question is '+req.body[s]);
        data.question=req.body[s];
        s="a"+i;
        
        data.answer=req.body[s];
        s='op'+i+'1';
        data.option1=req.body[s];
        s='op'+i+'2';
        data.option2=req.body[s];
        s='op'+i+'3';
        data.option3=req.body[s];
        s='op'+i+'4';
        data.option4=req.body[s];

        
        // console.log('answer is '+req.body[s]);

        var newQuestion= new qus(data);
        var d= await newQuestion.save()
        .then(() => {
            console.log('i here '+i);
            return quesId[i]=(newQuestion._id);
        })
        .then(() =>{
            // console.log('i is '+i);
            //     console.log('cool');
                if(i>=(count))
                {
                    console.log(i);
                    data2(quesId);
                    res.send('Quiz has successfilly saved');

                } 
                //console.log(data);       
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send("Unable to save to database");
        });
        
    }
    
    
});
var data2= function(quesId)
{
    console.log("here");
    quizData={
        quizName: dataall.quizName,
        totalQuestion: dataall.count,
        questionID: quesId
    }
    console.log(quizData);
    var val2=new quiz(quizData);
    val2.save()
    .then(item=>{
        console.log('done');
    })
    .catch(err=>{
        console.log(err);
    });
}
module.exports=router;