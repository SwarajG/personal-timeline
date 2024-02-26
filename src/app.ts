import '@auth/googleAuth';
import routes from '@routes/v1';
import cors from 'cors';
import csrf from 'csurf';
import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import { sessionRedisStore } from '@utils/redisUtils';

const app: Express = express();

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(
	session({
		store: sessionRedisStore,
		secret: 'keyboard cat',
		resave: false, // don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
	}),
);
app.use(csrf());
app.use(passport.authenticate('session'));

app.use('/v1', routes);

export default app;
