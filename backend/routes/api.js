const express = require('express');
const taskQueue = require('../job/taskQueue');
const Redis = require('ioredis');

const router = express.Router();
const redis = new Redis();

// Route to add a job to the queue
router.post('/add-job', async (req, res) => {
  const { task } = req.body;
  await taskQueue.add({ task });
  res.json({ message: 'Job added successfully', task });
});

// Route to show caching
router.get('/data', async (req, res) => {
  const { key } = req.query;

  const cachedData = await redis.get(key);
  if (cachedData) {
    return res.json({ source: 'cache', data: cachedData });
  }

  const data = `Generated data for key: ${key}`;
  await redis.set(key, data, 'EX', 60); // Cache expires in 60 seconds
  res.json({ source: 'server', data });
});

module.exports = router;
