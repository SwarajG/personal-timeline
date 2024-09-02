import { AppDataSource } from '@database/data-source';
import { Items_Tags } from 'entity/Items_Tags';

const itemsTagsRepository = AppDataSource.getRepository(Items_Tags);

export const createPostTagMapping = async ({ postID, tagID }: { postID: number, tagID: number }) => {
  const postTagMappingEntity = new Items_Tags();
  postTagMappingEntity.post_id = postID;
  postTagMappingEntity.tag_id = tagID;
  const tagItemObject = itemsTagsRepository.create(postTagMappingEntity);
  const newTagMapping = await itemsTagsRepository.save(tagItemObject);
  return newTagMapping;
};