import { AppDataSource } from '@database/data-source';
import { Tag } from 'entity/Tag';
import { Items_Tags } from 'entity/Items_Tags'

const tagRepository = AppDataSource.getRepository(Tag);

export const createPostTag = async (text: string) => {
  const tagEntity = new Tag();
  tagEntity.text = text;
  const tagObject = tagRepository.create(tagEntity);
  const newTag = await tagRepository.save(tagObject);
  return newTag;
};

export const findTagByText = async (text: string) => {
  const tag = await tagRepository
    .createQueryBuilder("tag")
    .where("tag.text = :text", { text })
    .getOne()
  return tag;
}

export const findTags = async (text: string) => {
  const tags = await tagRepository
    .createQueryBuilder("tag")
    .where("tag.text like :text", { text })
    .getMany()
  return tags;
}

export const getTagsByPostId = async (postId: number) => {
  const tags = await tagRepository
    .createQueryBuilder('tag')
    .innerJoin(Items_Tags, 'items_tags', 'items_tags.tag_id = tag.id')
    .select(['tag.id', 'tag.text'])
    .where('items_tags.post_id = :postId', { postId })
    .getMany();

  return tags;
}