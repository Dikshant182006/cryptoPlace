const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

console.log(
  'Google Client ID loaded:',
  !!process.env.GOOGLE_CLIENT_ID
);

console.log(
  'Google Client Secret loaded:',
  !!process.env.GOOGLE_CLIENT_SECRET
);

console.log(
  'Google Callback URL:',
  process.env.GOOGLE_CALLBACK_URL
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = passport;
