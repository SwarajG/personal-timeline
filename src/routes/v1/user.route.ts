import express from 'express';
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
// const authController = require('../../controllers/auth.controller');
import { getUserProfile, logout } from '@controller/auth.controller';
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/get_user_profile', getUserProfile);
// router.post('/register', authValidation.register, authController.register);
// router.post('/login', authValidation.login, authController.login);
router.get('/logout', logout);
// router.post('/refresh-tokens', authValidation.refreshTokens, authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default router;