const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectWithRetries = async (maxRetries, timeoutMs, delayMs) => {
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            // console.log(`Attempt ${attempts + 1} to connect to the database...`);
            await Promise.race([
                client.connect().then(() => {
                    console.log("Database connected!");
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Connection timed out")), timeoutMs)
                )
            ]);
            return;
        } catch (err) {
            attempts++;
            console.error(`Attempt ${attempts} failed: ${err.message}`);
            if (attempts === maxRetries) {
                console.error("Max retries reached. Unable to connect to database.");
                process.exit(1);
            }
            // console.log(`Retrying connection in ${delayMs / 1000} seconds...`);
            await delay(delayMs);
        }
    }
};

(async () => {
    try {
        await connectWithRetries(5, 10000, 5000);
    } catch (err) {
        console.error("Critical failure:", err.message);
        process.exit(1);
    }

    const queryDatabase = async () => {
        try {
            const result = await client.query('SELECT NOW();');
            console.log('Database still connected. Database server current time:', result.rows[0]);
        } catch (err) {
            console.error('Error during query execution:', err);
        }
    };

    setInterval(queryDatabase, 120000);
})();

module.exports = client;
