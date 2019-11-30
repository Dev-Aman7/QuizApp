var mongoose=require('mongoose')
var schema=mongoose.Schema;

var questionSchema=new schema({
    question: { type: String},
    option1 : { type: String, required: true},
    option2 : { type: String, required: true},
    option3 : { type: String, required: true},
    option4 : { type: String, required: true},
    answer  : { type: String}
})
module.exports=mongoose.model('question',questionSchema);