const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');


/**
 * @swagger
 * /login:
 *   post:
 *   summary: Login a user
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: User logged in successfully.
 *         400:
 *           description: Email and password are required.
 *         401:
 *           description: Invalid password or email.
 *         500:
 *           description: An error occurred during logging in the user.
 */
router.post('/login', login);

module.exports = router;
