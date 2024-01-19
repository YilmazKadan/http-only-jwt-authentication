// backend/auth.js
const jwt = require('jsonwebtoken');

function generateTokens(user) {
  const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '50s' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  return { accessToken, refreshToken };
}


function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { generateTokens, verifyToken, verifyRefreshToken };
