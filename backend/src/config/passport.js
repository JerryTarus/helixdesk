// backend/src/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const avatar = profile.photos[0].value;
        const name = profile.displayName;

        // 1. Check if user exists
        const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userCheck.rows.length > 0) {
          const user = userCheck.rows[0];
          
          // 1a. If user exists but hasn't linked Google yet, link it now
          if (!user.google_id) {
             await db.query(
              'UPDATE users SET google_id = $1, avatar_url = $2 WHERE email = $3',
              [googleId, avatar, email]
            );
          }
          return done(null, user);
        } else {
          // 2. If user doesn't exist, Create New Account (End User by default)
          const newUser = await db.query(
            `INSERT INTO users (full_name, email, google_id, avatar_url, role, is_2fa_enabled) 
             VALUES ($1, $2, $3, $4, 'END_USER', false) 
             RETURNING *`,
            [name, email, googleId, avatar]
          );
          return done(null, newUser.rows[0]);
        }
      } catch (err) {
        console.error('Google Auth Error:', err);
        return done(err, null);
      }
    }
  )
);

// Serialize user for the session (we will use JWT primarily, but Passport needs this)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});