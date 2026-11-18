const mongoose = require('mongoose');
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose.connection.asPromise();
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

// Initial connection attempt
// connectDB().catch((err) => console.log("MongoDB initial connect:", err.message));

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 15,
  },
  lastname: {
    type: String,
    required: false,
    // minlength: 3,
    // maxlength: 15,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    validate: {
      validator: function (value) {
        return value.length >= 6;
      },
      message: "Password should be greater then 6 characters"
    }
  },
  favorites: { type: [String], default: [] },
  light: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = { User, connectDB };
