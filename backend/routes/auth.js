const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.isAdmin = decoded.isAdmin || decoded.role === 'admin';
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const userMiddleware = async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if(!user){
      return res.status(401).json({ message: "User not found"});
    }
    
    if(!user.isVerified){
      return res.status(403).json({ message: 'Please verify your email to access this resource' });
    }
    req.userId = decoded.userId || decoded.id || decoded._id; //set userId from token
    next();
  } catch (error) {
    console.error('JWT verify failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
};

module.exports = { authMiddleware, adminMiddleware, userMiddleware };
