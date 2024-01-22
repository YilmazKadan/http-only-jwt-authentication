// backend/auth.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const accessToken = jwt.sign({user:{ id: user.id, username: user.username }}, process.env.JWT_SECRET, { expiresIn: '5m' });
  return accessToken
}

function generateRefreshToken(user) {
    const refreshToken = jwt.sign({user:{ id: user.id, username: user.username }}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return refreshToken
  }


  function verifyToken(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true; // Token doğrulandı
    } catch (error) {
      return false; // Token doğrulanamadı
    }
  }
  
  function verifyRefreshToken(refreshToken) {
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      return true; // Refresh token doğrulandı
    } catch (error) {
      return false; // Refresh token doğrulanamadı
    }
  }
module.exports = { generateRefreshToken,generateToken, verifyToken, verifyRefreshToken };
