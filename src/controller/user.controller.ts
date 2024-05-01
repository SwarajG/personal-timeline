import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '@utils/catchAsync';

const createUserPost = catchAsync(async (req: Request, res: Response) => {
  const post = {};
  res.status(httpStatus.OK).send({ post });
});

export { createUserPost };