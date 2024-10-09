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

const queryDatabase = async () => {
    try {
        const result = await client.query('SELECT NOW();');
        console.log('Database still connected. Database server current time:', result.rows[0]);
    } catch (err) {
        console.error('Error during connect to database server', err);
    }
};

setInterval(queryDatabase, 120000);


// client.release = function(err) {
//     if (err) throw err;
//     console.log("Database released!");
//     client.end();
// }

module.exports = client;
