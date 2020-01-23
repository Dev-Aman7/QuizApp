var express = require("express");
var router = express.Router();
var person = require("../Schemas/person");

router.all("/", (req, res) => {
  person
    .findOne({ username: req.cookies.username })
    .populate({
      path: "attemptedQuiz",
      populate: "quizId"
    })
    .populate({
      path: "quizes"
    })
    .exec((err, result) => {
      if (err) {
        console.log("we got some err in profile");
      } else {
        // console.log(result);
        if (result.accountType == "faculty") {
          //   res.send(result);
          console.log("in faculty", result.accountType);
          res.render("facultyProfile", { data: result });
        } else {
          console.log("in student", result.accountType);
          res.render("studentProfile", { data: result });
        }
        // res.send(result);
      }
    });
});

module.exports = router;
