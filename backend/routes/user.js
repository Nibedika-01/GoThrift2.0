const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { userMiddleware } = require('./auth');
const sendEmail = require('../utils/sendEmail');

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

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
    const verificationCode = generateVerificationCode(); // Generate 6-digit code

    const user = new User({
      email,
      password,
      displayName: name || email.split('@')[0],
      phoneNumber,
      name,
      verificationToken,
      verificationCode, // Save the 6-digit code
      verificationCodeExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send verification email
    try {
      const emailContent = `
        <h2>Email Verification - GoThrift</h2>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>Please enter this code on the verification page to complete the process.</p>
        <p>This code will expire in 24 hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `;
      await sendEmail(email, 'Verify Your Email - GoThrift', emailContent);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
          isVerified: user.isVerified,
        },
        message: 'User registered successfully. Please check your email to verify.',
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      res.status(201).json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
          isVerified: user.isVerified,
        },
        message:
          "User registered successfully. However, we couldn't send the verification email. Please try using the 'Resend Verification Email' button.",
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
router.post('/verify-email-code', async (req, res) => {
  const { email, code } = req.body;
  console.log('Received verification request:', { email, code });
  try {
    if (!email || !code) {
      console.log('Missing email or code');
      return res.status(400).json({ success: false, message: 'Email and code are required' });
    }
    const user = await User.findOne({ email });
    console.log('Found user:', user ? 'Yes' : 'No', 'Stored code:', user?.verificationCode, 'Expires:', user?.verificationCodeExpires);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or incorrect verification code' });
    }
    if (user.verificationCode !== code) {
      console.log('Code mismatch: Stored', user.verificationCode, 'Provided', code);
      return res.status(400).json({ success: false, message: 'Invalid or incorrect verification code' });
    }
    if (user.verificationCodeExpires < Date.now()) {
      console.log('Code expired');
      return res.status(400).json({ success: false, message: 'Verification code has expired' });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, message: 'Server error during verification' });
  }
});

router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email address' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    try {
      const emailContent = `
        <h2>Email Verification - GoThrift</h2>
        <p>You requested a verification code for your email.</p>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>Please enter this code on the verification page to complete the process.</p>
        <p>This code will expire in 24 hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `;
      await sendEmail(email, 'Verify Your Email - GoThrift', emailContent);
      res.status(200).json({ message: 'Verification email has been resent successfully! Please check your inbox.' });
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.error('Resend verification outer error:', error);
    res.status(500).json({ message: 'Server error while resending verification email' });
  }
});

module.exports = router;