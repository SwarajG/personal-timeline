import httpStatus from 'http-status';
// import { Request, Response } from 'express';
import s3Helpers from '@utils/awsHelper';
import catchAsync from '@utils/catchAsync';

const createUserPost = catchAsync(async (req: any, res) => {
  // console.log('req: ', req.body.userID);
  const { text, userID } = req.body;
  // console.log('File: ', req.file);
  await s3Helpers.uploadToS3({ file: req.file, userID });
  const post = {};
  res.status(httpStatus.OK).send({ post });
});

export { createUserPost };