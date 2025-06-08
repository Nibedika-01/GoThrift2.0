const express = require('express');
const multer = require('multer');
const path = require('path');
const Clothing = require('../models/Clothing');

const router = express.Router();

// Multer storage configuration
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

// POST route to add a new clothing item
router.post('/clothing', upload.single('image'), async (req, res) => {
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
      sizes: sizes.split(',').map((size) => size.trim()), // Convert comma-separated string to array
      image: `/uploads/${req.file.filename}`,
    });
    await clothing.save();
    res.status(201).json({ message: 'Clothing item added', clothing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;