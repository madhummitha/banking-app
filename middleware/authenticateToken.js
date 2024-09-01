const jwt = require("jsonwebtoken");

module.exports = (token) => {
  if (!token) return null;

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
