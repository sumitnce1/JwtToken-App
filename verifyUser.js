const jwt = require("jsonwebtoken");
const { secretKey } = require("./config");

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1m" });
}

function verifyToken(req, res, next) {
  const { token } = req.headers;

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = { generateToken, verifyToken };
