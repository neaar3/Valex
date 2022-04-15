import cors from 'cors';
import express from 'express';
import cardRouter from './routers/cardRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cardRouter);

export default app;