const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var mid = require("../middleware/middlewares");
var result = require("../Schemas/resultSchema");
var person = require("../Schemas/person");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//route called on the time of creation of Quiz by faculty
router.all("/", urlencodedParser, function(req, res) {
  console.log("/quizResult");
  console.l;
  result
    .find({ quizId: req.query.quizId })
    .populate("person")
    .exec((err, data) => {
      res.render("allResults", { data: data });
    });
});
module.exports = router;
