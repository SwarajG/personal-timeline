import httpStatus from 'http-status';
import { getUserById } from '@services/user.service';
import s3Helpers from '@utils/awsHelper';
import catchAsync from '@utils/catchAsync';
import { createPost, findPostByID, findPostByUser, deletePostByID } from '@services/post.service';
import { User } from 'entity/User';
import { createPostTagMapping } from '@services/post_tag_mapping.serice';

const createUserPost = catchAsync(async (req: any, res) => {
  const { text, tags } = req.body;
  const userID = Number(req.user);
  const user = await getUserById(userID);
  const post: { user: User, content: string, media_url?: string } = {
    user,
    content: text
  };
  if (req.file) {
    const response = await s3Helpers.uploadToS3({ file: req.file, userID });
    post.media_url = response;
  }
  const finalPost = await createPost(post);
  if (tags) {
    const tagList = tags.split(',');
    for (const tag of tagList) {
      await createPostTagMapping({
        tagID: parseInt(tag, 10), postID: finalPost.id
      });

    }
  }
  res.status(httpStatus.OK).send({ post: finalPost });
});

const getPostsByUser = catchAsync(async (req: any, res) => {
  const userID = Number(req.user);
  const { offset = 0, limit = 10 } = req.query;
  const posts = await findPostByUser(userID, offset, limit);
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
  try {
    await s3Helpers.deleteFromS3(post.media_url);
    await deletePostByID(post.id);
    res.status(httpStatus.OK).send({ success: true });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ success: false });
  }
});

export { createUserPost, getPostsByUser, getPostsByID, deletePostByPostID };