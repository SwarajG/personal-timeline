import express from 'express';
import { createTag, getTagsByText } from '@controller/tag.controller';

const router = express.Router();

router.post('/', createTag);
router.get('/', getTagsByText);

export default router;