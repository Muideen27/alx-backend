import kue from 'kue';
import redis from 'redis';

// Create a Kue queue
const queue = kue.createQueue({
  redis: {
    host: '127.0.0.1', // Redis server host
    port: 6379,        // Redis server port
  },
});

// Create an object containing job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a test message!',
};

// Create a job in the queue
const job = queue.create('push_notification_code', jobData);

// Event listener for job creation success
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
  process.exit(0); // Exit the script after job creation
});

// Event listener for job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Event listener for job failure
job.on('failed', () => {
  console.log('Notification job failed');
});

// Save the job to the queue
job.save();

