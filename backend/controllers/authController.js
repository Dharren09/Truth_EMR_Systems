const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { User, Provider, Patient } = require('../models');

exports.registerUser = async (req, res) => {
  const { name, username, email, password, role, gender, contact, address, dob } = req.body;

  // Validator
  if (!email || !password) {
    throw Error('All fields must be specified');
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Weak Password' });
  }

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with a hashed password
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      gender,
      contact,
      address,
      dob,
    });

    // Create role-specific models
    if (role === 'patient') {
      await Patient.create({
        userId: user.id,
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        contact,
        address,
        dob,
      });
    } else {
      await Provider.create({
        userId: user.id,
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        contact,
        address,
        dob,
      });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, 'secret-key', {
      expiresIn: '1h',
    });

    // Send the token as a response
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Register error occurred' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, 'secret-key', {
      expiresIn: '1h',
    });

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login error occurred' });
  }
};

exports.logoutUser = async (req, res) => {
  const { userId } = req;
  const token = jwt.sign({}, SECRET_KEY, { expiresIn: 0 });
  res.clearCookie('access_token'); // Clear the token cookie
  res.status(200).json({ message: 'Logged out successfully' });
};