var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var quizschema=new Schema({
    quizName:{ type: String, required:true},
    totalQuestion:{ type: String, default: 5},
    questionID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionSchema'
    }]
})
module.exports=mongoose.model('question',quizschema);