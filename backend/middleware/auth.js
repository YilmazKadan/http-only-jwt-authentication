// backend/middleware/authMiddleware.js
const { verifyToken} = require('../auth');

async function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {   
      console.error(error);
      res.status(401).json({ error: 'Invalid Token' });
  }
}

module.exports = authMiddleware;
