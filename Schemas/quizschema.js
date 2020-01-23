var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var quizschema = new Schema({
  quizName: { type: String, required: true },
  author: { type: String, default: "NA" },
  totalQuestion: { type: String, default: 5 },
  questionID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question"
    }
  ],
  time: { type: Number, default: 30 },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ]
});
module.exports = mongoose.model("quiz", quizschema);
