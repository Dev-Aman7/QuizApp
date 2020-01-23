var express = require("express");
var router = express.Router();
var person = require("../Schemas/person");
var quiz = require("../Schemas/quizschema");
var comment = require("../Schemas/commentSchema");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.all("/", urlencodedParser, (req, res) => {
  var data = {
    author: req.cookies.username,
    time: Date.now(),
    text: req.body.content
  };
  var newComment = comment(data);
  newComment.save().then(newComment => {
    // console.log(newComment);
    quiz
      .findById(req.query.quizId)
      .then(quiz => {
        quiz.comment.unshift(newComment._id);
        // console.log("herefirst");
        quiz.save();
        // console.log(quiz);
      })
      .then(() => {
        res.redirect("/displayAllQuiz");
      });
  });
});

module.exports = router;
