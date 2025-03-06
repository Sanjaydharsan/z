const express = require('express');
const router = express.Router();
const Users = require('../models/userSchema');

// Login Route
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user by username
    const userData = await Users.find({ username: username, password: password });

    if (userData && userData.length > 0) {
      res.send({
        status: true,
        data: userData ,
        message: 'Data retrieved successfully',
      });
    } else {
      res.send({
        status: false,
        data: [],
        message: 'Data not found',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: 'Internal Server Error' });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, password, username, email } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ status: false, message: 'Email already in use' });
    }

    // Create a new user
    const newUser = new Users({
      name : name,
      password : password,
      username : username,
      email : email,
    });
      
    // Save the new user to the database
    await newUser.save();

    res.status(201).send({ status: true, data: newUser, message: 'User saved successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: 'User not registered' });
  }
});

module.exports = router;
