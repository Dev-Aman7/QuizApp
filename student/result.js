const express = require("express");
const mid = require("../middleware/middlewares");
var person = require("../Schemas/person");
var result = require("../Schemas/resultSchema");
const router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mongoose = require("mongoose");
router.all("/", urlencodedParser, (req, res) => {
  var id = mongoose.Types.ObjectId(req.query.quizId);
  console.log(id);
  //   result.findOne({ quizId: id }).then(() => {
  //     res.send(result);
  //   });
  result.findById(id).exec((err, data) => {
    res.render("result", { data: data });
  });
});

module.exports = router;
