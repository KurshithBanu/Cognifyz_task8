const Queue = require('bull');

// Initialize a job queue with Redis
const taskQueue = new Queue('taskQueue', {
  redis: { host: '127.0.0.1', port: 6379 }, 
});

//redis installed seperately for windows

// Process jobs
taskQueue.process(async (job) => {
  console.log(`Processing job: ${job.data.task}`);
  await new Promise((resolve) => setTimeout(resolve, 2000)); 
  console.log('Job completed:', job.data.task);
});

module.exports = taskQueue;
