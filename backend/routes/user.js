const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { userMiddleware } = require('./auth');
const sendEmail = require('../utils/sendEmail');


router.get('/user', userMiddleware, async (req, res) => {
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
  const { email, password, phoneNumber, name } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const user = new User({
      email, 
      password,
      displayName: name || email.split('@')[0],
      phoneNumber,
      name,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Try to send email, but don't fail registration if email fails
    try {
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
      const emailContent = `
        <h2>Email Verification - GoThrift</h2>
        <p>Please verify your email by clicking the link below to access all features:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `;

      await sendEmail(email, "Verify Your Email - GoThrift", emailContent);
      
      res.status(201).json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
          isVerified: user.isVerified
        },
        message: "User registered successfully. Please check your email to verify."
      });
      
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      
      // Still return success, but with a different message
      res.status(201).json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
          isVerified: user.isVerified
        },
        message: "User registered successfully. However, we couldn't send the verification email. Please try using the 'Resend Verification Email' button."
      });
    }
    
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/user/login', async (req, res) => {
  console.log("entered user route");
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await User.findOne({ email });
    console.log('Login attempt for email:', email);
    console.log('User found:', user ? user.email : 'Not found');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Check if token is expired
    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification token has expired' });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({ message: 'Invalid or expired verification token' });
  }
});

router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate new token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Send email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailContent = `
      <h2>Email Verification - GoThrift</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `;

    await sendEmail(email, 'Verify Your Email - GoThrift', emailContent);

    res.status(200).json({ message: 'Verification email resent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;