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

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, reply) => {
    if (error) {
      console.error(`Error setting value for ${schoolName}: ${error}`);
    } else {
      console.log(`Value for ${schoolName} set successfully. Reply: ${reply}`);
    }
  });
}

// Function to display the value for a school key in Redis
function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, reply) => {
    if (error) {
      console.error(`Error getting value for ${schoolName}: ${error}`);
    } else {
      console.log(`Value for ${schoolName}: ${reply}`);
    }
  });
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

