import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createUser } from '@services/user.service';
import config from '@config/index';
import { googleAuthType } from '@customTypes/authTypes';
import { User } from 'entity/User';

// console.log('config.auth.google.GOOGLE_CLIENT_ID: ', config.auth.google.GOOGLE_CLIENT_ID, config.auth.google.GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
  clientID: config.auth.google.GOOGLE_CLIENT_ID,
  clientSecret: config.auth.google.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/v1/auth/google/callback",
  scope: ['profile', 'email']
},
  async function (accessToken, refreshToken, profile: any, cb) {
    console.log('profile: ', profile);

    const user = await createUser(profile);
    cb(null, user);
  }
));

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    console.log('User1: ', user);
    cb(null, { id: user.id, name: user.displayName });
  });
});

passport.deserializeUser(function (user: User, cb) {
  process.nextTick(function () {
    console.log('User2: ', user);
    return cb(null, user);
  });
});