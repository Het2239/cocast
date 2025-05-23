import express from 'express';
import fs from 'fs';

const router = express.Router();

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Append email to JSON file (simple example)
  const filePath = './subscribers.json';
  let subscribers = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    subscribers = JSON.parse(data);
  }

  subscribers.push({ email, subscribedAt: new Date() });

  fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

  res.json({ message: 'Subscribed successfully!' });
});

export default router;
