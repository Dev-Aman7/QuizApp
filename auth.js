const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var person = require("./Schemas/person");
var localStorage = require("localStorage");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/", urlencodedParser, function(req, res) {
  var sess = req.session;
  console.log("in auth route");
  var query = {
    username: req.body.username,
    password: req.body.password,
    accountType: req.body.accType
  };
  console.log(req.body.username + " " + req.body.password);
  person.findOne(query, function(err, result) {
    if (err) throw err;
    if (result == null) {
      console.log("could not find user");
      res.redirect("/");
    } else {
      // console.log('id of user',result._id);
      localStorage.setItem("userId", result._id);
      res.cookie("username", req.body.username);
      res.cookie("password", req.body.password);
      if (result.accountType === "student") res.redirect("/displayAllQuiz");
      else res.redirect("/createQuiz");
      //res.sendFile(__dirname+'/public/Home.html');
    }
  });
});

router.get("/", function(req, res) {
  res.redirect("/");
});

module.exports = router;
