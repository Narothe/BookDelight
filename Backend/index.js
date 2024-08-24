const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;


app.use(bodyParser.json());
app.use(morgan('combined'));

const { swaggerUiServe, swaggerUiSetup } = require('./swagger');
app.use('/api-docs', swaggerUiServe, swaggerUiSetup);

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to BookDelight server!</h1><br>');
});

app.listen(port, () => {
  console.log(`BookDelight server listening at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
