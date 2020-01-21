const express = require("express");
const mid = require("../middleware/middlewares");
var person = require("../Schemas/person");
var result = require("../Schemas/result");
var localStorage = require("localStorage");
const router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var sess;
// Display the dashboard page
router.all("/", urlencodedParser, mid.formHandler, async function(
  req,
  res,
  next
) {
  //result=out();
  // console.log(localStorage.getItem('Quiz'));
  var lstore = JSON.parse(localStorage.getItem("Quiz"));
  var count = 0;
  // console.log(result);
  let d = await lstore.forEach((element, index) => {
    // console.log('request is', req.body);
    // console.log('Q'+index);
    // console.log(req.body['Q'+index]+"   "+element.answer)
    if (element.answer == req.body["Q" + index]) {
      count++;
    }
  });
  // console.log('id of quiz is',localStorage.getItem('userId'));
  var data = {
    quizId: req.body.id,
    person: localStorage.getItem("userId"),
    score: count
  };
  var newResult = new result(data);
  let us = await newResult
    .save()
    .then(async () => {
      person.findOne({ username: req.session.username }, (err, doc) => {
        if (err) {
          console.log("error");
        } else {
          //console.log(result);
          doc.attemptedQuiz.push(newResult.id);
          doc.save();
          console.log("saved");
        }
      });
    })
    .then(() => {
      localStorage.removeItem("Quiz");
      res.render("result", { result: count });
    })
    .catch(err => console.log(err));
});

module.exports = router;
