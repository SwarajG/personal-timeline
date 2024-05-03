import { AppDataSource } from '@database/data-source';
import { Post } from 'entity/Post';
import { User } from 'entity/User';

const postRepository = AppDataSource.getRepository(Post);

const createPost = async ({ content, media_url, user }: { content: string, media_url: string, user: User }) => {
  const postEntity = new Post()
  postEntity.content = content;
  postEntity.media_url = media_url;
  postEntity.user = user;
  const postObject = postRepository.create(postEntity);
  const newPost = await postRepository.save(postObject);
  return newPost;
};

export { createPost };