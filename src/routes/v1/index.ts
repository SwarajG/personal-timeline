import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import postRoute from './post.route';
import tagRoute from './tag.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/tags',
    route: tagRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
