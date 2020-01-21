var express = require("express");
var router = express.Router();
var person = require("../Schemas/person");
var bodyParser = require("body-parser");
var localStorage = require("localStorage");
var quizes = require("../Schemas/quizschema");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/", urlencodedParser, (req, res) => {
  var quiz = req.param("quiz");
  quizes
    .findOne({ _id: quiz })
    .populate({
      path: "questionID",
      select: " question option1 option2 option3 option4 answer"
    })
    .exec((err, Quiz) => {
      if (err) res.send(err);
      else {
        //Store all data of quiz in localStorage
        person
          .findById(localStorage.getItem("userId"))
          .populate("attemptedQuiz")
          .then(val => {
            console.log(val);
            for (var i = 0; i < val.attemptedQuiz.length; i++) {
              console.log(val.attemptedQuiz[i].quizId, String(Quiz._id));
              if (String(val.attemptedQuiz[i].quizId) == String(Quiz._id)) {
                res.redirect("/displayAllQuiz");
                return 0;
              }
            }
          })
          .then(got => {
            if (got != 0) {
              console.log("I am here");
              localStorage.setItem("Quiz", JSON.stringify(Quiz.questionID));
              localStorage.setItem("quizId", JSON.stringify(Quiz._id));
              //console.log(Quiz.questionID);
              res.header(
                "Cache-Control",
                "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
              );
              res.render("quiz", {
                time: Quiz.time,
                id: Quiz._id,
                quizName: Quiz.quizName,
                data: Quiz.questionID
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  // console.log("in route "+quiz);
  // res.send("I am here "+ quiz);
});

module.exports = router;
