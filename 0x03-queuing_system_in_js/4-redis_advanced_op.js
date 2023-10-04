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

// Function to create a hash using hset
function createHash() {
  client.hset(
    'HolbertonSchools',
    'Portland',
    50,
    redis.print
  );

  client.hset(
    'HolbertonSchools',
    'Seattle',
    80,
    redis.print
  );

  client.hset(
    'HolbertonSchools',
    'New York',
    20,
    redis.print
  );

  client.hset(
    'HolbertonSchools',
    'Bogota',
    20,
    redis.print
  );

  client.hset(
    'HolbertonSchools',
    'Cali',
    40,
    redis.print
  );

  client.hset(
    'HolbertonSchools',
    'Paris',
    2,
    redis.print
  );
}

// Function to display the hash using hgetall
function displayHash() {
  client.hgetall('HolbertonSchools', (error, result) => {
    if (error) {
      console.error(`Error getting hash: ${error}`);
    } else {
      console.log(result);
    }
  });
}

// Call the functions
function main() {
  createHash();
  displayHash();
}

main(); // Call the main function to execute the tasks

