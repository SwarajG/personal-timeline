import httpStatus from 'http-status';
import { getUserById } from '@services/user.service';
import s3Helpers from '@utils/awsHelper';
import catchAsync from '@utils/catchAsync';
import { createPost, findPostByID, findPostByUser, deletePostByID } from '@services/post.service';

const createUserPost = catchAsync(async (req: any, res) => {
  const { text } = req.body;
  const userID = Number(req.user);
  const user = await getUserById(userID);
  const response = await s3Helpers.uploadToS3({ file: req.file, userID });
  const post = {
    user,
    content: text,
    media_url: response
  };
  const finalPost = await createPost(post);
  res.status(httpStatus.OK).send({ post: finalPost });
});

const getPostsByUser = catchAsync(async (req: any, res) => {
  const userID = Number(req.user);
  const posts = await findPostByUser(userID);
  res.status(httpStatus.OK).send({ data: { posts } });
});

const getPostsByID = catchAsync(async (req: any, res) => {
  const { id } = req.params;
  const post = await findPostByID(id);
  res.status(httpStatus.OK).send({ data: { post } });
});

const deletePostByPostID = catchAsync(async (req: any, res) => {
  const { id } = req.params;
  const postID = Number(id);
  const post = await findPostByID(postID);
  await s3Helpers.deleteFromS3(post.media_url);
  await deletePostByID(post.id);
  res.status(httpStatus.OK).send({ success: true });
});

export { createUserPost, getPostsByUser, getPostsByID, deletePostByPostID };