import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import userRouter from './routers/users.js';
import contactsRouter from './routers/contactsRouter.js';
import checkToken from './middlewares/checkToken.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/users', userRouter);
app.use('/contacts', checkToken, contactsRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

export default app;
