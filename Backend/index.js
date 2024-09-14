const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const register = require('./routes/register');
const login = require('./routes/login');
const logout = require("./routes/logout");
const addBook = require('./routes/addBook');
const addReview = require('./routes/addReview');
const book = require('./routes/book');
const books = require('./routes/books');

const swagger = require('./swagger');

const app = express();
const port = process.env.SERVER_PORT;


console.log('Server is starting...\n');

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/', register);
app.use('/', login);
app.use('/', logout);
app.use('/', addBook);
app.use('/', addReview);
app.use('/', book);
app.use('/', books)

swagger(app);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to BookDelight server!</h1><br>');
});

app.listen(port, () => {
  console.log(`BookDelight server listening at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
