const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create new user (signup)
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  // You check if both username and password are present. If not, return a 400 Bad Request.

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });
   //You're checking the database to make sure the username isn’t already taken. If it is, send an error.

    const user = new User({ username, password, role });
    await user.save();
    // You create a new user, then save it in the MongoDB database using Mongoose.


    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
