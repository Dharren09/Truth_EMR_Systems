var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Dharrenz1996',
    database: 'TruthMD',
    port: '3306'
});

con.connect(function(err){
    if(err){
	throw err;
    } else{
	console.log('\x1b[91mSuccessfully connected to \x1b[1mTruthMD\x1b[0m\x1b[94m Database\x1b[0m');
    }
});
