const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    displayName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    verificationToken:{
        type: String
    },
    verificationTokenExpires:{
        type: Date
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) { //avoid double hashing by veryfing if the pw is new or modified
        this.password = await bcrypt.hash(this.password, 10); //hash code is created
    }
    next();
});

//Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);