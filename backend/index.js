// backend/index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { generateTokens } = require('./auth');
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
    const { accessToken, refreshToken } = generateTokens(user);
    
    res
    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    .header('Authorization', accessToken)
    .send(user);
  }
  else{
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.get('/products', authMiddleware, (req, res) => {
   return res.json(mockProducts);
});

  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
