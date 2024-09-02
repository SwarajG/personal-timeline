import httpStatus from 'http-status';
import catchAsync from '@utils/catchAsync';
import { createPostTag, findTags, findTagByText } from '@services/tag.service';

const createTag = catchAsync(async (req, res) => {
  const { text } = req.body;
  const isTagAlreadyExists = await findTagByText(text);
  if (isTagAlreadyExists) {
    res.status(httpStatus.OK).send({ success: false, message: 'Tag already exists', tag: isTagAlreadyExists });
  }
  const finalTag = await createPostTag(text);
  res.status(httpStatus.OK).send({ tag: finalTag });
});

const getTagsByText = catchAsync(async (req, res) => {
  const text = req.query.text as string;
  const finalTags = await findTags(text);
  res.status(httpStatus.OK).send({ tags: finalTags });
});

export { createTag, getTagsByText };