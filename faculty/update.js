const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var mid = require("../middleware/middlewares");
var quiz = require("../Schemas/quizschema");
var qus = require("../Schemas/questionsSchema");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//route called on the time of creation of Quiz by faculty
router.get("/", urlencodedParser, function(req, res) {
  console.log("/update");
  quiz.findById(req.query.quizId).exec((err, data) => {
    res.render("update", { id: req.query.quizId });
  });
});
router.post("/", urlencodedParser, async (req, res) => {
  console.log("/updateQuiz post method");
  dataall = req.body;
  count = req.body.count;
  quesId = [];
  data = {};
  for (i = 1; i <= count; i++) {
    console.log("init " + i);

    s = "q" + i;
    data.question = req.body[s];
    s = "a" + i;
    data.answer = req.body[s];
    s = "op" + i + "1";
    data.option1 = req.body[s];
    s = "op" + i + "2";
    data.option2 = req.body[s];
    s = "op" + i + "3";
    data.option3 = req.body[s];
    s = "op" + i + "4";
    data.option4 = req.body[s];

    // console.log('answer is '+req.body[s]);

    var newQuestion = new qus(data);
    let d = await newQuestion
      .save()
      .then(() => {
        console.log("i here " + i);
        quesId.push(newQuestion._id);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("Unable to save to database");
      });
  }
  quiz
    .updateOne(
      { _id: req.body.id },
      { $set: { questionId: quesId, totalQuestion: req.body.count } }
    )
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render("addQuestions");
      }
    });
});
module.exports = router;
