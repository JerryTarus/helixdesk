// backend/src/controllers/authController.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// Production Cookie Options
const cookieOptions = {
  httpOnly: true, // Prevents JS access (Anti-XSS)
  secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS
  sameSite: 'Lax', // Protects against CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days matching Refresh Token
};

exports.googleCallback = (req, res) => {
  const user = req.user;
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set tokens in HttpOnly Cookies
  res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // Redirect to frontend. The frontend will now call /api/auth/me 
  // to verify the session since it can't read the cookies directly.
  res.redirect(`${process.env.FRONT_END_URL}/dashboard`);
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
};

// backend/src/controllers/authController.js
exports.getMe = async (req, res) => {
  try {
    // We use req.user.id which was set by the verifyToken middleware
    const userId = req.user.id || req.user.sub; // Handle both standard and Google IDs

    const result = await db.query(
      'SELECT id, full_name, email, role, avatar_url FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User session not found in database' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    // This will print the EXACT error in your backend terminal
    console.error("DATABASE_ERROR_IN_GETME:", err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
exports.refreshToken = async (req, res) => {
  // Read from cookie instead of body
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    const result = await db.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    const user = result.rows[0];

    if (!user) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.cookie('accessToken', newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.json({ role: user.role });
  });
};