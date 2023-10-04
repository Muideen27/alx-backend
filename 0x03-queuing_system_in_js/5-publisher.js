import redis from 'redis';

// Create a Redis client for publishing
const publisher = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
});

// Handle Redis client connection events for publisher
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

publisher.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Function to publish a message after a specified time
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

// Publish messages with different delays
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300); // This message will unsubscribe and quit the subscriber
publishMessage('Holberton Student #3 starts course', 400);

