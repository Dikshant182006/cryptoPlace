const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from a .env file

// Use the cloud URI if available, otherwise fallback to local for safety
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto';

mongoose.connect(dbURI)
  .then(() => console.log('Successfully connected to MongoDB Cloud!'))
  .catch((err) => console.error('Database connection error:', err));

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);
