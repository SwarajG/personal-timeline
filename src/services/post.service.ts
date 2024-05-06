import { AppDataSource } from '@database/data-source';
import { Post } from 'entity/Post';
import { User } from 'entity/User';

const postRepository = AppDataSource.getRepository(Post);
// const userRepository = AppDataSource.getRepository(User);

const createPost = async ({ content, media_url, user }: { content: string, media_url: string, user: User }) => {
  const postEntity = new Post()
  postEntity.content = content;
  postEntity.media_url = media_url;
  postEntity.user = user;
  const postObject = postRepository.create(postEntity);
  const newPost = await postRepository.save(postObject);
  return newPost;
};

const findPostByUser = async (userID: number) => {
  const posts = await postRepository
    .createQueryBuilder("post")
    .where("post.userId = :id", { id: userID })
    .getMany()
  return posts;
};

const findPostByID = async (id: number) => {
  const post = await postRepository
    .createQueryBuilder("post")
    .where("post.id = :id", { id })
    .getOne();
  return post;
};

const deletePostByID = async (id: Number) => {
  // console.log('id: ', id);
  const post = await postRepository
    .createQueryBuilder()
    .delete()
    .from(Post)
    .where("id = :id", { id })
    .execute();
  return { success: true };
};

export { createPost, findPostByUser, findPostByID, deletePostByID };