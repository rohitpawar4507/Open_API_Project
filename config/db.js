// dbConfig.js
const mysql = require('mysql');
require('dotenv').config();

const dbConfig = {
    host      : process.env.MYSQL_HOST,
    user      : process.env.MYSQL_USER,
    password  : process.env.MYSQL_PASSWORD,
    database  : process.env.MYSQL_DATABASE,
    connectionLimit: 10,
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
