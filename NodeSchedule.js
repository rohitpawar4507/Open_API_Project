
const axios = require('axios');
const db = require('./config/db'); // Import your database connection from db.js
const schedule = require('node-schedule');
const https = require('https');

// Define the API URL
const apiUrl = 'https://reqres.in/api/users?delay=3';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Ignore self-signed certificates
  }),
});

// Initialize the last inserted record ID to 6 (assuming you have records with IDs 1 to 6 already)
let lastInsertedId = 0;

// Function to fetch data from the API and save it to MySQL
async function fetchAndSaveData() {
  try {
    // Fetch data from the API
    const response = await axiosInstance.get(apiUrl);
    const userData = response.data.data;

    // Find the next user to insert
    const nextUser = userData.find(user => user.id === lastInsertedId + 1);

    if (!nextUser) {
      console.log('No more records to insert.');
      return;
    }

    // Create a connection from the pool
    const connection = await db.getConnection();

    // Insert the data into the MySQL database
    const query = 'INSERT INTO apidata (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?)';
    const values = [nextUser.id, nextUser.email, nextUser.first_name, nextUser.last_name, nextUser.avatar];

    // Use the query method to execute the SQL query
    await connection.query(query, values);

    // Release the connection back to the pool
    connection.release();

    // Update the last inserted record ID
    lastInsertedId = nextUser.id;

    console.log(`Data for ID ${nextUser.id} saved to MySQL successfully!`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Schedule the function to run every 2 minutes
const job = schedule.scheduleJob('*/1 * * * *', () => {
  console.log('Scheduled task running...');
  fetchAndSaveData();
});

console.log('Scheduled task started. It will run every 5 minutes.');
