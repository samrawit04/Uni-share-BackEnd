const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware function for authentication using JWT
const auth = (req, res, next) => {
  try {
    // Retrieve the JWT token from the request headers
    const token = req.header("x-auth-token");
    console.log(token);

    // If no token is present, return an unauthorized response
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied!!" });

    // Verify the token using the secret key from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);

    // If token verification fails, return an unauthorized response
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied!!" });

    // Attach the user ID from the verified token to the request object
    req.id = verified.id;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Handle any errors during the authentication process
    res.status(500).json({ error: err.message });
  }
};

// Export the auth middleware for use in other parts of the application
module.exports = auth;
