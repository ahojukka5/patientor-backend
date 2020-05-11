import express from 'express';
import cors from 'cors';
import pingRouter from './controllers/ping';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/ping', pingRouter);

export default app;
