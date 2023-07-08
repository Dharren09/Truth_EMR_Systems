// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Provider} = require('../models');
const { Patient } = require('../models');


//User registration
router.post('/register', async (req, res) => {
  const { name, username, email, password, role, gender, contact, address, dob } = req.body;

  try {
    //check if the user with the same email already exists
    const existingUser = await User.findOne({ where: {email}});
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user with a hashed password
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      gender,
      contact,
      address,
      dob
    });
    //await user.save();


    //create role-specific models
    if (role === 'patient') {
      const patient = new Patient({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        gender: user.gender,
        contact: user.contact,
        address: user.address,
        dob: user.dob
      });
      await patient.save();
      res.status(200).json({ message: 'Patient registration successful' });
    } else {
      const provider = new Provider({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        gender: user.gender,
        contact: user.contact,
        address: user.address,
        dob: user.dob
      });
      await provider.save();
      res.status(200).json({ message: 'Provider registration successful' });
    }
    //res.status(201).json(newUser)
    // Create and sign a JWT token
    /*const token = jwt.sign({ userId: newUser._id }, 'secret-key', {
      expiresIn: '1h',
    });

    // Send the token as a response
    res.status(201).json({ token });
    */
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Register error occurred' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({where: {email}});

    //If user exists but password is wrong
    if (user && !(await bcrypt.compare(password, user.password))) {
      return res.json({ error: 'Incorrect Password' })
    }

    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    /*

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, 'secret-key', {
      expiresIn: '1h',
    });
    */

    // Send the token as a response
    //res.json({ token });
    res.status(201).json({ message: 'Login Successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login error occurred' });
  }
});

module.exports = router;