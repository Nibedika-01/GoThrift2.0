const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Clothing = require('../models/Clothing');
require('dotenv').config();

const router = express.Router();

//multer storage setup
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


//middleware to check admin jwt
const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Authorization header:", req.headers.authorization);
  console.log("Extracted token:", token);
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};


//add clothing item
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


//get all clothing item
router.get('/clothing', async(req, res) => {
  try {
    const clothes = await Clothing.find().sort({ createdAt: -1});
    res.json(clothes);
  }
  catch (error){
    res.status(500).json({ message: error.message});
  }
});

// Update a product
router.put('/clothing/:id', checkAdmin, async (req, res) => {
  try {
    const updated = await Clothing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/clothing/:id', checkAdmin, async (req, res) => {
  try {
    await Clothing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark as sold
router.patch('/clothing/:id/sold', checkAdmin, async (req, res) => {
  try {
    const product = await Clothing.findByIdAndUpdate(req.params.id, { sold: true }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;