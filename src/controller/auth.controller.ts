import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '@utils/catchAsync';
// import { userRepository } from '@repo';
import { getUserById } from '@services/user.service';
import { deleteUserSession } from '@utils/redisUtils';
// import { authService, userService, tokenService } from '@services';
// const { authService, userService, tokenService } = require('../services');

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userID = Number(req.user);
  const user = await getUserById(userID);
  res.status(httpStatus.OK).send({ user });
});

// const register = catchAsync(async (req: Request, res: Response) => {
//   const user = await userService.createUser(req.body);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.status(httpStatus.CREATED).send({ user, tokens });
// });

const login = catchAsync(async (req: Request, res: Response) => {
  // console.log('req: ', req.user);
  // const { email, password } = req.body;
  // const user = await authService.loginUserWithEmailAndPassword(email, password);
  // const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user: {} });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  console.log('req: ', req.user);
  const userID = String(req.user);
  // const { email, password } = req.body;
  // const user = await authService.loginUserWithEmailAndPassword(email, password);
  // const tokens = await tokenService.generateAuthTokens(user);
  req.session.destroy(async (err) => {
    const response = await deleteUserSession(userID);
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ success: false, data: {} })
    } else {
      res.status(httpStatus.OK).send({ success: true, data: {} })
    }
  });
});

// const logout = catchAsync(async (req: Request, res: Response) => {
//   await authService.logout(req.body.refreshToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const refreshTokens = catchAsync(async (req: Request, res: Response) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

// const forgotPassword = catchAsync(async (req, res) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const resetPassword = catchAsync(async (req, res) => {
//   await authService.resetPassword(req.query.token, req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const sendVerificationEmail = catchAsync(async (req, res) => {
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
//   await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const verifyEmail = catchAsync(async (req, res) => {
//   await authService.verifyEmail(req.query.token);
//   res.status(httpStatus.NO_CONTENT).send();
// });

export { getUserProfile, login, logout };

// export default {
//   register,
//   login,
//   logout,
//   refreshTokens,
// }
