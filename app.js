
var express = require('express');
var session=require('express-session');

var createQuiz=require('./faculty/createQuiz');
var addQuiz=require('./faculty/addQuiz')
var app = express();
var bodyParser = require('body-parser');
var displayAllQuiz=require('./student/displayAllQuiz');
var showQuiz=require('./student/showQuiz');
var middleware=require('./middleware/middlewares')

var verify=require('./student/verify');
var auth=require('./auth');
var signup=require('./signup');
var db=require('./db/setup');
db.connect();
//var quiz=require('./views/quizschema');
//var createQuiz=require('./createQuiz');

app.set('view engine','ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(session({secret: 'user',resave: true, saveUninitialized: true}));
app.use(express.static("public"));

app.get('/home',middleware.formHandler,function(req,res){
    res.sendFile(__dirname+'/public/Home.html');
});
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/login.html');
});
app.use('/auth',auth);

app.get('/views/myscript.js', function(req, res) {
    res.sendFile(__dirname + '/views/myscript.js');
});

app.use('/verify',verify);

app.use('/signup',signup);

app.use('/addQuiz',addQuiz);

app.use('/createQuiz',createQuiz);

app.use('/showQuiz',showQuiz);

app.use('/displayAllQuiz',displayAllQuiz);
app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Server running on 3000");
});
