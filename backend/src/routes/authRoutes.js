// backend/src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware'); 
const { getAllUsers, updateUserRole } = require('../controllers/authController');

// Admin only routes
router.get('/users', verifyToken, getAllUsers);
router.patch('/users/:id/role', verifyToken, updateUserRole);

// Google Auth Trigger
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Auth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authController.googleCallback
);
router.get('/admin/stats', verifyToken, authController.getAdminStats);
router.get('/admin/logs', verifyToken, authController.getSystemLogs);

// Refresh Token
router.post('/refresh-token', authController.refreshToken);

router.post('/verify-otp', authController.verifyOTP);
// Get Current User (Protected)
router.get('/me', verifyToken, authController.getMe);

module.exports = router;