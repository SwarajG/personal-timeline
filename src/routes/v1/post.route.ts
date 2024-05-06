import express from 'express';
import { createUserPost, getPostsByUser, getPostsByID, deletePostByPostID } from '@controller/post.controller';
import multer, { memoryStorage } from 'multer';

const storage = memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', getPostsByUser);
router.get('/:id', getPostsByID);
router.post('/', upload.single('file'), createUserPost);
router.delete('/:id', deletePostByPostID);

export default router;