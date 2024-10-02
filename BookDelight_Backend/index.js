const express = require('express');
const cors = require('cors');
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
const reviewVotes = require('./routes/reviewVotes');
const review = require('./routes/review');
const addPhoto = require('./routes/addPhoto');

const swagger = require('./swagger');

const app = express();
const port = process.env.SERVER_PORT;

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
app.use(cors());

console.log('Server is starting...\n');

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/', register);
app.use('/', login);
app.use('/', logout);
app.use('/', addBook);
app.use('/', addReview);
app.use('/', book);
app.use('/', books);
app.use('/', reviewVotes);
app.use('/', review)
app.use('/', addPhoto);

app.use('/uploads', express.static('uploads')); // Udostępnia folder z obrazkami


swagger(app);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to BookDelight server!</h1><br>');
});

app.listen(port, () => {
  console.log(`BookDelight server listening at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
