const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Clothing = require('../models/Clothing');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only (jpeg, jpg, png)'));
    }
  },
});

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    jwt.verify(token, 'secret_key');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/clothing', checkAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, category, color, price, sizes } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    const clothing = new Clothing({
      name,
      category,
      color,
      price: parseFloat(price),
      sizes: sizes.split(',').map((size) => size.trim()),
      image: `/uploads/${req.file.filename}`,
    });
    await clothing.save();
    res.status(201).json({ message: 'Clothing item added', clothing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;