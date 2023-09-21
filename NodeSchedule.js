const axios = require('axios');
const db = require('./config/db'); // Import your database connection from db.js
const schedule = require('node-schedule');

// Define the API URL
const apiUrl = 'https://reqres.in/api/users?page=2';

// Function to fetch data from the API and save it to MySQL
async function fetchAndSaveData() {
  try {
    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const userData = response.data.data;

    // Insert the data into the MySQL database
    for (const user of userData) {
      const query = 'INSERT INTO apidata (id, email, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?)';
      await db.execute(query, [user.id, user.email, user.first_name, user.last_name, user.avatar]);
    }

    console.log('Data saved to MySQL successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Schedule the function to run every hour
const job = schedule.scheduleJob('*/10 * * * *', () => {
  console.log('Scheduled task running...');
  fetchAndSaveData();
});

console.log('Scheduled task started. It will run every hour.');
