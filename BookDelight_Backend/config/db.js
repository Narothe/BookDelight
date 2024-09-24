const { Client } = require('pg')

require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

client.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

// client.release = function(err) {
//     if (err) throw err;
//     console.log("Database released!");
//     client.end();
// }

module.exports = client;
