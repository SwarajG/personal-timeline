import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from '@routes/v1';
import '@auth/googleAuth';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));
// app.options('*', cors());

app.use('/v1', routes);

export default app;