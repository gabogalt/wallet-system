const mysql = require('mysql2');
const dotenv = require('dotenv');

// dotenv 
dotenv.config()

// create the connection to database

const connection =  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password:process.env.DB_PASS
});

module.exports = {connection}