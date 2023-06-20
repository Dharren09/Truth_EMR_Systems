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
	console.log('Successfully connected to TruthMD Database')
    }
});
