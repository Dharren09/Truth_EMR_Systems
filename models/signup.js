var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var db = require.main.require('./controllers/db_controller');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');

const { check, validationResult } = require('express-validator');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', [
  check('username').notEmpty().withMessage("Username is required"),
  check('password').notEmpty().withMessage("Password is required"),
  check('email').notEmpty().withMessage("Email is required")
], function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  var email_status = "email is not verified";
  var email = req.body.email;
  var username = req.body.username;

  db.signup(req.body.username, req.body.email, req.body.password, req.body.email_status);
  var token = randomToken(10);
  db.verify(req.body.username, email, token);
  db.userId(email, function(err, result) {
    var id = result[0].id;
    var output = `<p>Dear '${username}'</p>
    <p>Thank you for signing up with TruthMD EHS Systems, your verification id and token are provided below:</p>
    <ul>
      <li>User ID: '${id}'</li>
      <li>Token: '${token}'</li>
    </ul>
    <p>Verify using this link: <a href="https://localhost:8000/verify">Verify</a></p>
    <p><b>This is an automatically generated email</b></p>`;

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dharrydharrenzerah@gmail.com",
        password: "Dharrenz"
      }
    });
    var mailOptions = {
      from: "TruthMD EHS Systems",
      to: email,
      subject: "User account Verification",
      html: output
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        return console.log(err);
      }
      console.log(info);
    });
    res.send("Please check your email for verification details");
  });
});

module.exports = router;
