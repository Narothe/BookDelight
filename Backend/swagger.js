const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const port = process.env.SERVER_PORT;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'BookDelight API',
            version: '1.0.0',
            description: 'API for BookDelight application',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerUiSetup = swaggerUi.setup(swaggerDocs);
const swaggerUiServe = swaggerUi.serve;

module.exports = {
    swaggerUiServe,
    swaggerUiSetup
};
