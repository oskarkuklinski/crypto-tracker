const mongoose = require('mongoose');

// User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    }
});

UserSchema.pre('save', function(next) {
    this.email = this
    .email
    .toLowerCase(); // ensure that e-mail is in lower case
    
    let currentDate = new Date().getTime();
    this.updatedAt = currentDate;
    next();
});

// User module
var User = mongoose.model('User', UserSchema);

// Export User module
module.exports = User;