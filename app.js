var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
var db=require("./db");
var routes=require('./routes/route.js');
var user=require('./routes/user.js');
var story=require('./routes/story.js');
var bodyParser=require('body-parser');

var session=require('express-session');

var app=express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var session=require('express-session');
app.use(session({secret:"iloveedureka",resave: true, saveUninitialized: true}));

//routes end points
app.get('/',routes.index);
app.get('/new-story',routes.newStory);
app.get('/login',routes.login);
app.get('/register',routes.register);
app.get('/techStack',routes.techStack);

//user endpoints
app.post('/newUser',user.doCreate);
app.get('/registrationSuccessful',user.registrationSuccessful);
app.post('/authenticate',user.login);
app.get('/logout',user.logout);

//story endpoints
app.post('/add-story',story.addStory);
app.get('/stories',story.stories);
app.get('/stories/:story',story.getStory);
app.post('/stories/:slug/saveComment',story.saveComment);



//error handling
app.use(function(req, res) {
     console.log(chalk.red("Error: 404"));
     res.status(404).render('404');
});

app.use(function(error, req, res, next) {
     console.log(chalk.red('Error : 500'+error))
     res.status(500).render('500');
});

var port = process.env.PORT || 3000;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("application running at "+port));
});
