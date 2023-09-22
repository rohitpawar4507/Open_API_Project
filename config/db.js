// // dbConfig.js
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const dbConfig = {
//     host      : process.env.MYSQL_HOST,
//     user      : process.env.MYSQL_USER,
//     password  : process.env.MYSQL_PASSWORD,
//     database  : process.env.MYSQL_DATABASE,
//     connectionLimit: 10,
// };

// const connection = mysql.createConnection(dbConfig);

// module.exports = connection;


const mysql = require('mysql2/promise'); // Use mysql2/promise for connection pool
//require('dotenv').config();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'user_auth_db',
  connectionLimit: 10,
};

// Create a connection pool using mysql2/promise
const pool = mysql.createPool(dbConfig);

module.exports = pool;
