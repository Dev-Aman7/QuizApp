const express = require("express");
const mid = require("../middleware/middlewares");
var person = require("../Schemas/person");
var result = require("../Schemas/resultSchema");
var localStorage = require("localStorage");
const router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mongoose = require("mongoose");
var sess;
// Display the dashboard page
router.all("/", urlencodedParser, async function(req, res, next) {
  console.log("/verify");

  var lstore = JSON.parse(localStorage.getItem("Quiz"));
  var count = 0;

  let d = await lstore.forEach((element, index) => {
    if (element.answer == req.body["Q" + index]) {
      count++;
    }
  });
  var data = {
    quizId: mongoose.Types.ObjectId(req.body.id),
    person: localStorage.getItem("userId"),
    score: count
  };
  var newResult = new result(data);
  newResult
    .save()
    .then(() => {
      person.findOne({ username: req.cookies.username }, (err, doc) => {
        if (err) {
          console.log("error");
        } else {
          doc.attemptedQuiz.push(newResult.id);
          doc.save();
          console.log("saved");
        }
      });
    })
    .then(() => {
      localStorage.removeItem("Quiz");
      res.render("result", { data: newResult });
    })
    .catch(err => console.log(err));
});

module.exports = router;
