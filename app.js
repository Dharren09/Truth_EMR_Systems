var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var ejs = require('ejs');
var multer = require('multer');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var expressValidator = require('express-validator');
var sweetalert = require('sweetalert2');
var http = require('http');
var bodyParser = require('body-parser')
var db = require('./controllers/db_controller');
var signupRouter = require('./models/signup')

var app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(function(req, res, next) {
    if (req.cookies['username'] == null) {
      res.redirect('/login');
    } else {
      next();
    }
  });  

app.use('/signup', signupRouter)

var server = app.listen(8000, function(){
    console.log('\x1b[94m\x1b[1mTruth\x1b[0m\x1b[34m\x1b[1mMD\x1b[0m\x1b[90m server has been started successfully\x1b[0m');
});