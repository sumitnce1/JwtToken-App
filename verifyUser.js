const jwt = require("jsonwebtoken");
const { secretKey } = require("./config");
const { blacklistToken } = require("./blacklist");

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1m" });
}

function verifyToken(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    console.error("Missing token.");
    return res.status(401).send("Missing token");
  }
  console.log("header se aaya token:", token);
  console.log("blacklist se aaya token:", blacklistToken);

  // Check if the token is in the blacklistToken
  if (blacklistToken.includes(token)) {
    console.log("Token in blacklist.");
    console.log("Blacklisted Tokens:", blacklistToken); // Log the current blacklistToken array
    return res.status(401).json({ message: "Invalid token." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error instanceof jwt.TokenExpiredError) {
      // Token is expired
      console.log("Token expired.");
      return res.status(401).json({ message: "Token expired." });
    } else {
      // Other errors (e.g., invalid signature, malformed token)
      console.log("Invalid token.");
      return res.status(401).json({ message: "Invalid token." });
    }
  }
}

module.exports = { generateToken, verifyToken };
