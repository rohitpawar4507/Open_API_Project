const axios = require('axios');
const mysql = require('mysql2/promise'); // We use the promise-based version of mysql2

// Define the API URL
const apiUrl = 'https://reqres.in/api/users?page=2';

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: 'password', // Replace with your MySQL password
  database: 'user_auth_db', // Replace with your MySQL database name
  connectionLimit: 10, // Adjust this value based on your needs
});

// Function to fetch data from the API and save it to MySQL
async function fetchAndSaveData() {
  try {
    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const userData = response.data.data; // Assuming the API returns user data

    // Create a connection from the pool
    const connection = await pool.getConnection();
if(userData.length) {
     // Insert the data into the MySQL database
     for await (const user of userData) {
        const query = 'INSERT INTO apidata (id, email, first_name, last_name , avatar) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(query, [user.id, user.email, user.first_name, user.last_name, user.avatar]);
      }
}
   

    // Release the connection back to the pool
    connection.release();

    console.log('Data saved to MySQL successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection pool when done
    pool.end();
  }
}

// Call the function to fetch and save data
fetchAndSaveData();
