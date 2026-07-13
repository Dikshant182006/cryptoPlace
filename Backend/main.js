const express = require("express");
const app = express();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userModel = require("./models/user");
const authMiddleware = require("./middleware/authMiddleware");

const port = 3000;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Coins API
app.get("/api/coins", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Coins API error",
    });
  }
});

// Global API
app.get("/api/global", async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");

    res.json(response.data);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Global API error",
    });
  }
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

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
      {
        id: user._id,
      },
      "secretKey",
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    const userData = await userModel.findById(user._id).select("-password");

    res.json({
      message: "Login successful",
      userData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 
app.get("/api/profile", authMiddleware, async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");
  res.json(user);
});

// Logout
app.get("/api/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0),
  });

  res.json({
    message: "Logged out",
  });
});

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
