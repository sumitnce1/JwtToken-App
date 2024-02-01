// In-memory session storage
const sessions = {};

// In-memory blacklistToken token storage
const blacklistToken = [];

  // Check if the user already has an active session
  if (sessions[userId]) {
    // If a session already exists, return the existing token
    res.json({ token: sessions[userId].token });
    return;
  }

  // generating a token with expiration time
  function generateToken(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1m" }); // 1 minute expiration
  }

  // Save the token in the session
  sessions[userId] = { token };

  // To remove the session after a specific time
  const removeSession = (userIdToRemove) => {
    setTimeout(() => {
      if (sessions[userIdToRemove]) {
        delete sessions[userIdToRemove];
        console.log(`Session expired and removed for user: ${userIdToRemove}`);
      }
    }, 1 * 60 * 1000); // Remove after 1 minute
  };


// Now Destroy The token add in Blacklist and Delete the token from the session

// Check if the user exists in the session
if (sessions[userId]) {
    // Add the token to the blacklistToken
    const tokenToAdd = sessions[userId].token;
    const expirationTime = Date.now() + 1 * 60 * 1000; // Remove after 1 minute
    blacklistToken.push({ token: tokenToAdd, expiration: expirationTime });    
    // the token added to the blacklist
    console.log(`Token added to the blacklist: ${tokenToAdd}`);

    // Remove the token from the session
    delete sessions[userId];

    // Set a timer to automatically remove the token from the blacklist after specific time
    setTimeout(() => {
      const indexToRemove = blacklistToken.findIndex((entry) => entry.token === tokenToAdd);
      if (indexToRemove !== -1) {
        blacklistToken.splice(indexToRemove, 1);
        console.log(`Token expired and removed from the blacklist: ${tokenToAdd}`);
      }
    }, 1 * 60 * 1000); // Remove after 1 minute

    // Send a response to the client indicating that the token is no longer valid
    res.json({ message: "User signed out successfully. Token invalidated." });

// Check if the user already has an active session
if (sessions[userId]) {
    // If a session already exists, return the existing token
    res.json({ token: sessions[userId].token });
    return;
  }
   // Generating a token with expiration time
  function generateToken(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1m" }); // 1 minute expiration
  }
   // Save the token in the session
  sessions[userId] = { token };