const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    first_name: {
        type:     String, 
        required: [true, 'first name is required'],
    },
    last_name: {
        type:     String, 
        required: [true, 'last name is required']
    },
    email:{
        type:      String,
        trim:      true, 
        lowercase: true,
        unique:    true,
        required:  true,
    },
    password: {
        type: String
    },
    updated: {
        type:    Date,
        default: Date.now
    },
    created: {
        type:    Date, 
        default: Date.now
    },
    refreshToken: String
});

module.exports = mongoose.model('User', UserSchema)