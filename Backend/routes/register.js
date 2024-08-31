const express = require('express');
const router = express.Router();
const { register } = require('../controllers/createController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *         - firstName
 *         - lastName
 *         - birthDay
 *         - birthMonth
 *         - birthYear
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email (must be unique)
 *         password:
 *           type: string
 *           description: The user's password
 *         username:
 *           type: string
 *           description: The user's username (must be unique)
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         birthDay:
 *           type: integer
 *           description: The user's birth day
 *         birthMonth:
 *           type: integer
 *           description: The user's birth month
 *         birthYear:
 *           type: integer
 *           description: The user's birth year. Year must be number bigger than 1800
 *       example:
 *         email: user@example.com
 *         password: SecurePassword123
 *         username: username123
 *         firstName: John
 *         lastName: Doe
 *         birthDay: 15
 *         birthMonth: 8
 *         birthYear: 1990
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', register);

module.exports = router;
