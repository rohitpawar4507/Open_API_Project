const axios = require('axios');
const db = require('./config/db'); // Import your database connection from db.js
const schedule = require('node-schedule');
const https = require('https');
const logger = require('./utils/logger');
const { log } = require('console');

// Define the API URL
const apiUrl = 'https://reqres.in/api/users?delay=3';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Ignore self-signed certificates
  }),
});

let currentPage = 1; // Initialize to the first page
let currentIndex = 0; // Initialize to the first record

// Function to fetch data from the API and save it to MySQL
async function fetchAndSaveData() {
  try {
    // Fetch data from the API
    const response = await axiosInstance.get(apiUrl, {
      params: { page: currentPage },
    });

    const userData = response.data.data;

    if (userData.length === 0) {
      console.log('No more records to insert. Stopping scheduler.');
      logger.logger.info('No more records to insert. Stooping scheduler.');
      job.cancel(); // Stop the scheduler
      return;
    }

    if (currentIndex >= userData.length) {
      // Move to the next page if all records on the current page have been processed
      currentPage++;
      currentIndex = 0;
      return;
    }

    const user = userData[currentIndex];

    // Create a connection from the pool
    const connection = await db.getConnection();

    // Check if the record already exists in the database
    const [existingRow] = await connection.query('SELECT id FROM apidata WHERE id = ?', [user.id]);

    if (existingRow.length === 0) {
      // Insert the data into the MySQL database
      const query = 'INSERT INTO apidata (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?)';
      const values = [user.id, user.email, user.first_name, user.last_name, user.avatar];

      // Use the query method to execute the SQL query
      await connection.query(query, values);

      console.log(`Data for ID ${user.id} saved to MySQL successfully!`);
      logger.logger.info(`Data for ID ${user.id} saved to MySQL successfully!`)
    } else {
      console.log(`Data for ID ${user.id} already exists in MySQL. Skipping.`);
      logger.info(`Data for ID ${user.id} already exists in MySQL. Skipping.`);
    }

    // Release the connection back to the pool
    connection.release();

    // Move to the next record
    currentIndex++;
  } catch (error) {
    console.error('Error:', error);
    logger.error(`Error: `, error);
  }
}

// Schedule the function to run every 10 seconds
const job = schedule.scheduleJob(' */2 * * * *', () => {
  console.log('Scheduled task running...');
  logger.logger.info('Scheduled task running...');
  fetchAndSaveData();
});

console.log('Scheduled task started. It will run every 2 minutes.');
logger.logger.info('Scheduled task started. It will run every 2 minutes.');
