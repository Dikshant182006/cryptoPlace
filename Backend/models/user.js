const mongoose = require('mongoose');
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/crypto";
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

// Initial connection attempt
connectDB().catch((err) => console.log("MongoDB initial connect:", err.message));

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },

  lastname: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  
  password: { type: String, required: true },

  favourites: { type: [String], default: [] }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = { User, connectDB };
