import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createUser } from '@services/user.service';
import config from '@config/index';
import { googleAuthType } from '@customTypes/authTypes';
// import { User } from 'entity/User';

passport.use(
	new GoogleStrategy(
		{
			clientID: config.auth.google.GOOGLE_CLIENT_ID,
			clientSecret: config.auth.google.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/v1/auth/google/callback',
			scope: ['profile', 'email'],
		},
		async function (accessToken, refreshToken, profile: any, cb) {
			const user = await createUser(profile);
			cb(null, user);
		},
	),
);

passport.serializeUser(function (user: any, cb) {
	process.nextTick(function () {
		cb(null, user.id);
	});
});

passport.deserializeUser(function (userID: string, cb) {
	process.nextTick(function () {
		return cb(null, userID);
	});
});
