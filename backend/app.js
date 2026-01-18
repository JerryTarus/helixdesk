// backend/app.js
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');

// Configuration & Strategies
require('./src/config/passport'); 

const authRoutes = require('./src/routes/authRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');

const app = express();

// 1. Security & Middleware
app.use(helmet());
app.use(cookieParser()); // This fixes consistent redirect issue
app.use(morgan('dev')); 

// 2. CORS Setup (One single clean declaration)
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// 3. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Initialize Passport
app.use(passport.initialize());

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// 6. Health Check
app.get('/', (req, res) => {
  res.send('HelixDesk API is Operational');
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n HelixDesk Server running on port ${PORT}`);
  console.log(`🔗 Frontend URL: http://localhost:5173`);
});