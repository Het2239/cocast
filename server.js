import express from 'express';
import cors from 'cors';
import subscribeRouter from './src/pages/api/subscribe.js'; 

const app = express();

app.use(cors({
  origin: 'https://www.cocastindia.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Cocast API server!');
});

app.use('/src/pages/api/subscribe', subscribeRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
