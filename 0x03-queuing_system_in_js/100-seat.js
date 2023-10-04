// Redis Setup: Create a Redis client, reserveSeat, and getCurrentAvailableSeats functions:

const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client
const client = redis.createClient();

// Promisify Redis functions
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

// Initialize the number of available seats and reservationEnabled flag
let numberOfAvailableSeats = 50;
let reservationEnabled = true;

// Function to reserve seats
async function reserveSeat(number) {
  await setAsync('available_seats', number);
  numberOfAvailableSeats = number;
}

// Function to get the current available seats
async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats) || 0;
}

// Set the initial number of available seats
reserveSeat(numberOfAvailableSeats);


// Kue Queue Setup: Create a Kue queue

const kue = require('kue');
const queue = kue.createQueue();


//Express Server Setup: Create an Express server

const express = require('express');
const app = express();
const port = 1245;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Create the route GET /available_seats to return the number of available seats

app.get('/available_seats', (req, res) => {
  res.json({ numberOfAvailableSeats });
});


// Create the route GET /reserve_seat to reserve a seat.

app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue
    .create('reserve_seat', {})
    .save((err) => {
      if (err) {
        console.error(`Seat reservation job failed: ${err.message}`);
        res.json({ status: 'Reservation failed' });
      } else {
        console.log(`Seat reservation job ${job.id} completed`);
        res.json({ status: 'Reservation in process' });
      }
    });
});


// Create the route GET /process to process the queue and decrease the available seats.

app.get('/process', async (req, res) => {
  if (queue.workers.length > 0) {
    return res.json({ status: 'Queue processing' });
  }

  const currentAvailableSeats = await getCurrentAvailableSeats();

  if (currentAvailableSeats === 0) {
    reservationEnabled = false;
    return res.json({ status: 'Queue processing' });
  } else if (currentAvailableSeats >= 0) {
    queue.process('reserve_seat', async (job, done) => {
      try {
        await reserveSeat(currentAvailableSeats - 1);
        if (currentAvailableSeats === 0) {
          reservationEnabled = false;
        }
        done();
      } catch (error) {
        done(new Error('Not enough seats available'));
      }
    });

    res.json({ status: 'Queue processing' });
  }
});

// Start the Server: Start the Express server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


