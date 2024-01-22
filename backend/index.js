// backend/index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { generateToken, generateRefreshToken, verifyRefreshToken,verifyToken } = require('./auth');
const authMiddleware = require('./middleware/auth')
require('dotenv').config({path: '../.env'});
const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: '*' }));

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

const mockProducts = [
    { id: 1, name: 'Product 1', price: 20.99 },
    { id: 2, name: 'Product 2', price: 30.99 },
    { id: 3, name: 'Product 3', price: 15.99 },
  ];

  
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    
    res
  .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
  .cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'strict' })
  .send(user);

  }
  else{
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.post('/logout', (req, res) => {

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  res.status(200).json('User Logged out')
});

app.post('/refresh', (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }
  
    try {
      const decoded = verifyRefreshToken(refreshToken)
      const accessToken = generateToken(user)
  
      res
        .header('Authorization', accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
  });

app.get('/products', authMiddleware, (req, res) => {
   return res.json(req.user);
});


app.get('/check-auth', (req, res) => {
    const accessToken = req.cookies.accessToken;
  
    // Eğer accessToken varsa ve verifyToken doğru bir şekilde çalışıyorsa
    if (accessToken && verifyToken(accessToken)) {
      res.send({ isAuthenticated: true });
    } else {
      res.send({ isAuthenticated: false });
    }
  });
  
 
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
