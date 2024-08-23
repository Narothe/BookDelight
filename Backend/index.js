const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
