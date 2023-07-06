var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var crypto = require('crypto');

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
      bcrypt.hash(password, 10, function(err, hashedpassword) {
        if (err) {
          console.log(err);
          return;
        }
        
        var query = "INSERT INTO `login`(`username`, `email`, `password`, `email_status`) VALUES (?, ?, ?, ?)";
        con.query(query, [username, email, password, status], function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("Signup successful");
            callback(null, result);
          }
        });
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

module.exports.login = function(email, password, callback) {
  var query = "SELECT * FROM login WHERE email = ?";
  con.query(query, [email], function(err, result) {
    if (err) {
      console.log(err);
      return callback(err);
    }

    if (result.length === 0) {
      console.log("Error: User not found");
      return callback("User not found");
    }

    var hashedPassword = result[0].password;
    bcrypt.compare(password, hashedPassword, function(err, isMatch) {
      if (err) {
        console.log(err);
        return callback(err);
      }

      if (isMatch) {
        console.log("Login Successful");
        return callback(null, result[0]);
      } else {
        console.log("Error: Incorrect password");
        return callback("Incorrect password");
      }
    })
  })
};