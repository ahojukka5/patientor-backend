import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;
