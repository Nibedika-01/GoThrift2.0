const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId || decoded.id; //set userId from token
    next();
  } catch (error) {
    console.error('JWT verify failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('displayName email phoneNumber');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const responseData = {
      id: user._id,
      displayName: user.displayName || user.email.split('@')[0],
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    res.json(responseData); //otherwise sends user data
  } catch (error) {
    console.error('Error in /user route:', error)
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/user/register', async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email, password: hashedPassword,
      displayName: email.split('@')[0],
      phoneNumber
    });
    await user.save();
    const token = jwt.sign({
      userId: user._id
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;