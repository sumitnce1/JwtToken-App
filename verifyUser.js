const jwt = require("jsonwebtoken");
const { secretKey } = require("./config");
const { blacklistToken } = require("./blacklist");

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "30m" });
}

function verifyToken(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    console.error("Missing token.");
    return res.status(401).send("Missing token");
  }

  // Check if the token is in the blacklistToken
  const tokenInBlacklist = blacklistToken.some(entry => entry.token === token);

  if (tokenInBlacklist) {
    console.log("Token in blacklist:", blacklistToken);
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
