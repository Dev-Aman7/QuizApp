var mongoose=require('mongoose')
var schema=mongoose.Schema;

var personSchema=new schema({
    name:{ type:String},
    accountType:{ type:String, required: true},
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    email:{ type: String},
    quizes:[{type: mongoose.Schema.Types.ObjectId, ref: 'quiz'}],// for author
    attemptedQuiz:[{type: mongoose.Schema.Types.ObjectId, ref: 'quiz'}]// for student

})
module.exports=mongoose.model('person',personSchema);