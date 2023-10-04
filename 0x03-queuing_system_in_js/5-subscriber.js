import redis from 'redis';

// Create a Redis client for subscription
const subscriber = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
});

// Handle Redis client connection events for subscriber
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Subscribe to the 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Handle incoming messages from the channel
subscriber.on('message', (channel, message) => {
  console.log(`Message received on channel ${channel}: ${message}`);

  // If the message is 'KILL_SERVER', unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel', () => {
      console.log('Unsubscribed from channel holberton school channel');
      subscriber.quit();
      process.exit(0); // Quit the process
    });
  }
});

