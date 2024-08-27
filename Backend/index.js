const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const register = require('./routes/register');
const login = require('./routes/login');
const swagger = require('./swagger');

const app = express();
const port = process.env.SERVER_PORT;


app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/', register);
app.use('/', login);

swagger(app);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to BookDelight server!</h1><br>');
});

app.listen(port, () => {
  console.log(`BookDelight server listening at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
