var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var comment = require("../Schemas/commentSchema");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var quizes = require("../Schemas/quizschema");

router.all("/", urlencodedParser, function(req, res) {
  quizes
    .find()
    .populate({
      path: "comment",
      populate: "replies"
    })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        console.log(result);
        // res.send(result);
        res.render("allQuizes", { data: result, message: "No" });
      }
    });
});

module.exports = router;
