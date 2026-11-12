const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables")
}

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not logged In" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // By this we make data available to the next route
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' })
  }
};

module.exports = authMiddleware;
