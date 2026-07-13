const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/crypto")

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);
