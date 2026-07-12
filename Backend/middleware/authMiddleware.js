const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not logged In" });
    }

    const decorded = jwt.verify(token, "secretKey");
    
    req.user = decorded;
    next();
  } catch (error) {
    return res.status(400).json( {message: 'Invalid token'} )
  }
};

module.exports = authMiddleware;
