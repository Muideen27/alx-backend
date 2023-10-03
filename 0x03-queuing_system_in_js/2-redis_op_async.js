import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
});

// Promisify the get method to use async/await
const asyncGet = promisify(client.get).bind(client);

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

// Modified function to display the value for a school key in Redis using async/await
async function displaySchoolValue(schoolName) {
  try {
    const value = await asyncGet(schoolName);
    console.log(`Value for ${schoolName}: ${value}`);
  } catch (error) {
    console.error(`Error getting value for ${schoolName}: ${error}`);
  }
}

// Call the functions
async function main() {
  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
}

main(); // Call the main function to execute the tasks

// Note: Make sure to execute the main function to start the operations.

