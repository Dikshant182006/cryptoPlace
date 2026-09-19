require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { User, connectDB } = require("./models/user");
const authMiddleware = require("./middleware/authMiddleware");

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during transition/deployment
      }
    },
    credentials: true,
  }),
);

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "CryptoPlace Backend API is running successfully! 🚀",
  });
});

// Coins API
app.get("/api/coins", async (req, res) => {
  try {
    const { currency = "usd" } = req.query;

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
          price_change_percentage: "1h,24h,7d",
        },
      },
    );
    
    res.json(response.data);
  } catch (error) {
    console.error("Coins API error:", error.message);

    res.status(500).json({
      message: "Coins API error",
    });
  }
});

// Global API
app.get("/api/global", async (req, res) => {
  try {
    const { currency = "usd" } = req.query;

    const response = await axios.get("https://api.coingecko.com/api/v3/global", 
      {
        params: {
          vs_currency: currency
        }
      }
    )
    res.json(response.data);
  } catch (error) {
    console.error("Global API error:", error.message);
    res.status(500).json({
      message: "Global API error",
    });
  }
});

// Coin Details API
app.get("/api/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error("Coin details API error:", error.message);
    res.status(500).json({
      message: "Coin details API error",
    });
  }
});

// Coin Historical Chart API
app.get("/api/coins/:id/chart", async (req, res) => {
  try {
    const { id } = req.params;
    const { currency = "usd", days = "10", interval = "daily" } = req.query;

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: currency, // It dynamically passes usd, inr, eur
          days,
          interval,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Coin chart API error:", error.message);
    res.status(500).json({
      message: "Coin chart API error",
    });
  }
});

// Register
app.post("/register", async (req, res) => {
  try {
    await connectDB();
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = await User.findById(user._id).select("-password");

    res.json({
      message: "Login successful",
      userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

// Profile
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
app.get("/api/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
  });

  res.json({
    message: "Logged out",
  });
});

// Server
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
