import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
});

// Handle Redis client connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Close the Redis connection when done (optional)
// client.quit();

// You can perform Redis operations here, e.g., client.get(), client.set(), etc.

// Example: Get a value from Redis
// client.get('myKey', (error, result) => {
//   if (error) {
//     console.error(`Error getting value: ${error}`);
//   } else {
//     console.log(`Value: ${result}`);
//   }
// });

