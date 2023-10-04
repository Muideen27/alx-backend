import kue from 'kue';
import redis from 'redis';

// Create an array of jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  // Add more job objects as needed
];

// Create a Kue queue
const queue = kue.createQueue({
  redis: {
    host: '127.0.0.1', // Redis server host
    port: 6379,        // Redis server port
  },
});

// Loop through the array of jobs and create Kue jobs
jobs.forEach((jobData, index) => {
  // Create a job in the 'push_notification_code_2' queue
  const job = queue.create('push_notification_code_2', jobData);

  // Event listener for job creation success
  job.on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
  });

  // Event listener for job completion
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Event listener for job failure
  job.on('failed', (err) => {
    console.log(`Notification job ${job.id} failed: ${err}`);
  });

  // Event listener for job progress (if needed)
  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });

  // Save the job to the queue
  job.save();
});

console.log('Creating notification jobs...');

