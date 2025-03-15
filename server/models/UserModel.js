const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            
        },
        profileImage:{
            url: String,
            public_id: String
        },
       
        isVerified: {
            type: Boolean,
            default: false,
        }
    },{timestamps: true, });

const User = mongoose.model('User', userSchema);

module.exports = User;