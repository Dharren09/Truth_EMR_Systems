var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var db = require.main.require('./controllers/db_controller');
var nodemailer = require('nodemailer');
// var randomToken = require('random-token');
var ejs = require('ejs');
var path = require('path');
var bcrypt = require('bcrypt');
var crypto = require('crypto');


const { check, validationResult } = require('express-validator');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/login_signup.html'))
});

router.post('/', [
  check('username').notEmpty().withMessage("Username is required"),
  check('password').notEmpty().withMessage("Password is required"),
  check('email').notEmpty().withMessage("Email is required"),
  check('role').notEmpty().withMessage("Role is required")
], function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  var email_status = "email is not verified";
  var email = req.body.email;
  var username = req.body.username;
  var role = req.body.role;

  bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
    if (err) {
      console.log(err);
      return;
    }
    
    db.signup(req.body.username, req.body.email, req.body.password, req.body.email_status, req.body.role);
    var token = crypto.randomUUID();
    db.verify(req.body.username, email, token);
    db.getuserid(email, function(err, result) {
      var id = result[0].id;
      var output = ejs.renderFile(
        path.join(__dirname, '../views/verification.ejs'),
        { username: username, id: id, token: token, role: role },
        function(err, renderHtml) {
          if (err) {
            console.log(err);
            return;
          }
        }
      );

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "truthmdehssystems@gmail.com",
          password: "Truthmd"
        }
      });
    
      var mailOptions = {
        from: "TruthMD EHS Systems",
        to: email,
        subject: "User account Verification",
        html: renderHtml,
        text: `Thank you for signing up! Your role is: ${role}`,
      };
    
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          return console.log(err);
        }
        console.log(info);
      })
      res.render('verification', { username: username, id: id, token: token });
    });
  });
});

module.exports = router;