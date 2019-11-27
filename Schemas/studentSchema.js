var mongoose=require('mongoose');
var schema=mongoose.Schema;

var studentSchema=new schema({
    username:{ type: String, required: true},
    password:{ type: String, required: true}
})
module.exports=mongoose.model('student',studentSchema);