// backend/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();
require('./src/config/passport'); // Init Passport Strategy

// Routes
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// 1. Enterprise Security Headers
app.use(helmet());

// 2. Logging (Audit Trail for Dissertation)
app.use(morgan('combined')); 

// 3. CORS Setup (Allowing frontend)
app.use(cors({
  origin: process.env.FRONT_END_URL, 
  credentials: true
}));

// 4. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Initialize Passport
app.use(passport.initialize());

// 6. Routes
app.use('/api/auth', authRoutes);

// 7. Health Check
app.get('/', (req, res) => {
  res.send('HelixDesk API is Operational');
});

// 8. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 9. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n HelixDesk Server running on port ${PORT}`);
  console.log(`🔗 Google Callback: ${process.env.GOOGLE_CALLBACK_URL}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONT_END_URL}`);
});

const cookieParser = require('cookie-parser');

app.use(cookieParser()); // Required to read cookies
app.use(cors({
  origin: process.env.FRONT_END_URL, 
  credentials: true, // Required to allow cookies to be sent from Frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));