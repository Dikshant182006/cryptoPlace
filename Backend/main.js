require('dotenv').config();
const express = require("express");
const app = express();
const axios = require("axios");
const bcrypt = require('bcrypt');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://cryptoplace-dashboard-pearl.vercel.app",
    "https://cryptoplace-dashboard-git-main-dikshant182006s-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
const userModel = require('./models/user')
const auth = require('./middleware/authMiddleware');
const authMiddleware = require("./middleware/authMiddleware");

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
          price_change_percentage: "1h,24h,7d",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log("Coins Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/global", async (req, res) => {
  const now = Date.now();

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/global"
    );

    globalCache = response.data;
    gloabalCatchTime = now;
    res.json(response.data);
  } catch (error) {
    console.log("Global Error:", error.message);

    if(globalCache) {
      return res.json(globalCache);
    }

    res.status(500).json({ error: error.message });
  }
});

app.post('/register', async (req,res) => {
  const {firstname, lastname, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await userModel.findOne({email});

  if(existingUser) {
    return res.status(400).json({ message: "User already exists"});
  }
  
  await userModel.create({
    firstname,
    lastname,
    email,
    password : hashedPassword,
  })

  return res.status(201).json({ message: "User created successfully"});
});

app.post('/login', async (req, res) => {
  try{
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({ message: "Email and Password both are required"});
  }

  // find the user from database and user is not found then return an error
  const user = await userModel.findOne({email});
  if(!user) {
    return res.status(400).json({ message: "user not found" });
  }

  // If the password doesn't match, return an error.
  const comparePassword = await bcrypt.compare(password, user.password);
  if(!comparePassword) {
    return res.status(400).json( {message: 'Password is incorrect'} );
  }

  // If the password matches, generate a JWT token.
  const token =  jwt.sign({id: user._id}, "secretKey");
  // Store the JWT token in a cookie.
  res.cookie("token", token , {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  const userData = await userModel.findOne({email}).select("-password");

  return res.status(200).json( {
  message: 'User login successfully',
  userData,
  })
  } catch(error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get('/api/profile', authMiddleware, async  (req, res) => {
  const user = await userModel.findById(req.user.id).select('-password');
  res.json(user);
});

app.get('/api/logout', (req, res) => {
  res.cookie('token', "");
  res.send("cookie cleared")
})

app.listen(port, () => {
  console.log(`Server is running at the ${port}`);
});
