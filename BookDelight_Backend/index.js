const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const bookRoute = require('./routes/bookRoute');
const authRoute = require('./routes/authRoute');
const reviewRoute = require('./routes/reviewRoute');
const userRoute = require('./routes/userRoute');

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

app.use('/', reviewRoute);
app.use('/', bookRoute)
app.use('/', authRoute)
app.use('/', userRoute)

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
