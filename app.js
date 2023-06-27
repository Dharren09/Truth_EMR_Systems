var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var path = require('path');
var ejs = require('ejs');
var multer = require('multer');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var expressValidator = require('express-validator');
var sweetalert = require('sweetalert2');
var http = require('http');
var app = require('express');
var bodyParser = require('body-parser')
var db = require('./controllers/db_controller');
var signup = require('./models/signup')

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

	
var server = app.listen(8000, function(){
    console.log('\x1b[94m\x1b[1mTruth\x1b[0m\x1b[34m\x1b[1mMD\x1b[0m\x1b[90m server has been started successfully\x1b[0m');
});
