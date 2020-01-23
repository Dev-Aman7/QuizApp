var express = require("express");
var router = express.Router();
var comment = require("../Schemas/commentSchema");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.all("/", urlencodedParser, (req, res) => {
  var data = {
    author: req.cookies.username,
    time: Date.now(),
    text: req.body.content
  };
  console.log(req.query);
  var newComment = comment(data);
  newComment.save().then(newComment => {
    console.log(newComment);
    comment
      .findById(req.query.commentId)
      .then(result => {
        // console.log(result);
        result.replies.unshift(newComment._id);
        // console.log("herefirst");
        result.save();
        // console.log(result);
      })
      .then(() => {
        res.redirect("/displayAllQuiz");
      });
  });
});

module.exports = router;
