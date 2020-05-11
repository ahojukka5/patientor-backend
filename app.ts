import express from 'express';

const app = express();
app.use(express.json());


app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;
