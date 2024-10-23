const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const register = require('./routes/auth/register');
const login = require('./routes/auth/login');
const logout = require("./routes/auth/logout");
const addBook = require('./routes/book/addBook');
const addReview = require('./routes/review/addReview');
const book = require('./routes/book/book');
const books = require('./routes/book/books');
const reviewVotes = require('./routes/review/reviewVotes');
const review = require('./routes/review/review');
const reviews = require('./routes/review/reviews');
const addBookPhoto = require('./routes/book/addBookPhoto');
const addUserPhoto = require('./routes/user/addUserPhoto');
const bookPhoto = require('./routes/book/bookPhoto');
const userPhoto = require('./routes/user/userPhoto');
const currentlyReading = require('./routes/user/addCurrentlyReading');
const currentlyReadingPage = require('./routes/user/addCurrentlyReadingPage');
const showCurrentlyReading = require('./routes/user/currentlyReading');

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
app.use('/', reviews)
app.use('/', addBookPhoto);
app.use('/', addUserPhoto);
app.use('/', bookPhoto);
app.use('/', userPhoto);
app.use('/', currentlyReading);
app.use('/', currentlyReadingPage);
app.use('/', showCurrentlyReading);

app.use('/book-photo', express.static('uploads/book_photos'));
app.use('/user-photo', express.static('uploads/user_photos'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


swagger(app);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to BookDelight server!</h1><br>');
});

app.listen(port, () => {
  console.log(`BookDelight server listening at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
