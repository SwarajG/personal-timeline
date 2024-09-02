import { AppDataSource } from '@database/data-source';
import { Post } from 'entity/Post';
import { User } from 'entity/User';
import { getTagsByPostId } from './tag.service';
import { Items_Tags } from 'entity/Items_Tags';
import { Tag } from 'entity/Tag';

const postRepository = AppDataSource.getRepository(Post);

const createPost = async ({ content, media_url, user }: { content: string, media_url?: string, user: User }) => {
  const postEntity = new Post()
  postEntity.content = content;
  postEntity.media_url = media_url;
  postEntity.user = user;
  const postObject = postRepository.create(postEntity);
  const newPost = await postRepository.save(postObject);
  return newPost;
};

const findPostByUser = async (userID: number, offset: number, limit: number) => {
  const posts = await postRepository
    .createQueryBuilder("post")
    // .innerJoinAndSelect('post.user', 'user')
    .select(['post.id', 'post.content', 'post.media_url', 'post.created_at', 'user.id', 'user.picture', 'user.displayName', 'tag.id', 'tag.text'])
    .innerJoin(User, 'user', 'post.userId = user.id')
    .innerJoin(Items_Tags, 'items_tags', 'items_tags.post_id = post.id')
    .innerJoin(Tag, 'tag', 'items_tags.tag_id = tag.id')
    .where("post.userId = :id", { id: userID })
    .orderBy("post.created_at", "DESC")
    .skip(offset)
    .take(limit)
    .getRawMany();

  const finalPost: any = [];
  posts.forEach((post) => {
    let postDataIndex = finalPost.findIndex(({ id }: { id: number }) => id === post.post_id);
    console.log('postData: ', postDataIndex);
    if (postDataIndex === -1) {
      const { post_id: postID, post_content: postContent, post_media_url: postMediaUrl, post_created_at: postCreatedAt, user_picture: userPicture, user_id: userID, user_displayName: userName, tag_id: tagID, tag_text: tagText } = post;
      const postData = {
        id: postID,
        content: postContent,
        media_url: postMediaUrl,
        created_at: postCreatedAt,
        user: {
          picture: userPicture,
          id: userID,
          displayName: userName,
        },
        tags: [{
          id: tagID,
          text: tagText
        }]
      };
      finalPost.push(postData);
    } else {
      finalPost[postDataIndex] = {
        ...finalPost[postDataIndex],
        tags: [...finalPost[postDataIndex].tags, { id: post.tag_id, text: post.tag_text }]
      }
    }
  });
  return finalPost;
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