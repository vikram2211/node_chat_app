import express from 'express';
import Message from '../models/Messages.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;