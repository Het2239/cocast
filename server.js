import express from 'express';
import cors from 'cors';
const app = express();
// const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://www.cocastindia.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware to parse JSON body
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Cocast API server!');
});

// Import and use your subscribe route (adjust path if needed)
import subscribeRouter from './src/pages/api/subscribe.js'; 
app.use('/api/subscribe', subscribeRouter);
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
