import express from 'express';
import passport from 'passport';

type user = {
	user: any;
	session: any;
};
// import { login } from '@controller/auth.controller';
// import authValidation from '@validations/auth.validation';
// const authValidation = require('../../validations/auth.validation');
// const auth = require('../../middlewares/auth');

const router = express.Router();

// router.post('/register', authController.register);
// router.post('/login', login);
// router.post('/logout', authController.logout);
// router.post('/refresh-tokens', authController.refreshTokens);
router.get('/google', passport.authenticate('google'));

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		// const user = req.session;
		// req.session.id = req?.user?.id;
		// req.session.user = req.user;
		// Successful authentication, redirect home.
		res.redirect('http://localhost:3000');
	},
);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default router;
