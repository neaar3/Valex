import cors from 'cors';
import express from 'express';
import cardRouter from './routers/cardRouter.js';
import rechargeRouter from './routers/rechargeRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cardRouter);
app.use(rechargeRouter)

export default app;