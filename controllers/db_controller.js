var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dharrenz1996',
  database: 'TruthMD',
  port: '3306'
});

con.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('\x1b[33mSuccessfully connected to \x1b[1mTruthMD\x1b[0m\x1b[94m Database\x1b[0m');
  }
});

module.exports.signup = function(username, email, password, status, callback) {
  con.query('SELECT email FROM login WHERE email = ?', [email], function(err, result) {
    if (result[0] === undefined) {
      var query = "INSERT INTO `login`(`username`, `email`, `password`, `email_status`) VALUES (?, ?, ?, ?)";
      con.query(query, [username, email, password, status], function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Signup successful");
          callback(null, result);
        }
      });
    } else {
      console.log("Error: Email already exists");
      callback("Email already exists");
    }
  });
};

module.exports.verify = function(username, email, token, callback) {
  var query = "INSERT INTO `verify`(`username`, `email`, `token`) VALUES (?, ?, ?)";
  con.query(query, [username, email, token], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Verification added");
      callback(null, result);
    }
  });
};

module.exports.userId = function(email, callback) {
  var query = "SELECT * FROM verify WHERE email = ?";
  con.query(query, [email], callback);
};
