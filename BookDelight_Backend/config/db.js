const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectWithTimeout = async (timeoutMs) => {
    return Promise.race([
        client.connect().then(() => {
            console.log("Database connected!");
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Connection timed out")), timeoutMs)
        )
    ]);
};

(async () => {
    try {
        await connectWithTimeout(5000);
    } catch (err) {
        console.error("Failed to connect to database:", err.message);
        process.exit(1);
    }

    const queryDatabase = async () => {
        try {
            const result = await client.query('SELECT NOW();');
            console.log('Database still connected. Database server current time:', result.rows[0]);
        } catch (err) {
            console.error('Error during connect to database server', err);
        }
    };

    setInterval(queryDatabase, 120000);
})();
module.exports = client;