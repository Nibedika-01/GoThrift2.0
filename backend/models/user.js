const mongoose = require('mongoose');

//schema vaneko chai euta blueprint or structure for mu "user data"
const UserSchema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },
  //require vaneko cannot skip, unique vaneko no 2 user can have same name

  password: { type: String, required: true }, // For now, plain text (later hash)
  
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  //It's a string but limited to only 'admin' or 'user' (using enum).
});

module.exports = mongoose.model('User', UserSchema);
