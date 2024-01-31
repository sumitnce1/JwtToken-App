const { generateToken } = require("./verifyUser");
const { blacklistToken } = require("./blacklist");

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
    // Add the token to the blacklistToken
    const tokenToAdd = sessions[userId].token;
    const expirationTime = Date.now() + 1 * 60 * 1000; // 30 * 1000=30 seconds [1 * 60 * 1000 = 30min]
    blacklistToken.push({ token: tokenToAdd, expiration: expirationTime });    

    // Remove the token from the session
    delete sessions[userId];

    // Log the token added to the blacklist
    console.log(`Token added to the blacklist: ${tokenToAdd}`);

    // Set a timer to automatically remove the token from the blacklist after 30 minutes
    setTimeout(() => {
      const indexToRemove = blacklistToken.findIndex((entry) => entry.token === tokenToAdd);
      if (indexToRemove !== -1) {
        blacklistToken.splice(indexToRemove, 1);
        console.log(`Token expired and removed from the blacklist: ${tokenToAdd}`);
      }
    }, 30 * 60 * 1000);

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

// All Token see
const allBlacklistToken = (req, res) => {
  res.json({ blacklistToken });
};

// See User Data
const seeUserData = (req, res) => {
  const { userId } = req.params;

  try {
    const user = userData.find((u) => u.userId === userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
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
  allBlacklistToken,
};
