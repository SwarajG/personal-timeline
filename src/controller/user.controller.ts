import httpStatus from 'http-status';
import { getUserById } from '@services/user.service';
import s3Helpers from '@utils/awsHelper';
import catchAsync from '@utils/catchAsync';
import { createPost } from '@services/post.service';

const createUserPost = catchAsync(async (req: any, res) => {
  const { text, userID } = req.body;
  const user = await getUserById(userID);
  const response = await s3Helpers.uploadToS3({ file: req.file, userID });
  const post = {
    user,
    content: text,
    media_url: response
  };
  console.log('post: ', post);
  const finalPost = await createPost(post);
  res.status(httpStatus.OK).send({ post: finalPost });
});

export { createUserPost };