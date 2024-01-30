const jwt = require("jsonwebtoken");
const { secretKey } = require("./config");
const { generateToken } = require("./verifyUser");

// In-memory session storage
const sessions = {};

// Read user data from data.json
const userData = require("./data.json");

// Signin (Generate Token)
const signin = (req, res) => {
  const { userId } = req.body;

  // Check if the user already has an active session
  if (sessions[userId]) {
    // If a session already exists, return the existing token
    res.json({ token: sessions[userId].token });
    return;
  }

  // Generate JWT token using the imported generateToken function
  const token = generateToken(userId);

  // Save the token and expiration time in the session
  sessions[userId] = { token };

  res.json({ token });
};

// Sign Out API
const signout = (req, res) => {
  const { userId } = req.body;

  // Check if the user exists in the session
  if (sessions[userId]) {
    // Set the token expiration to the current time
    sessions[userId].expiration = Date.now() + 1000; // 1 second expiration

    // Remove the token from the session
    delete sessions[userId];

    // Send a response to the client indicating that the token is no longer valid
    res.json({ message: "User signed out successfully. Token invalidated." });
  } else {
    res.status(404).json({ message: "User not found in the session." });
  }
};

// All Token see
const allToken = (req, res) => {
  res.json({ sessions });
};

// See User Data
const seeUserData = (req, res) => {
  const { token } = req.headers;
  const { userId } = req.params;

  try {
    const decoded = jwt.verify(token, secretKey);

    if (String(decoded.userId) === userId) {
      const user = userData.find((u) => u.userId === userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } else {
      res.status(401).json({ message: "Invalid Token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token Expired or Invalid Token" });
  }
};

module.exports = {
  signin,
  signout,
  allToken,
  seeUserData,
};
