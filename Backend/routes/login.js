const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - identity
 *         - password
 *       properties:
 *         identity:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         identity: user@example.com
 *         password: SecurePassword123
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Email and password are required.
 *       401:
 *         description: Invalid password or email.
 *       500:
 *         description: An error occurred during logging in the user.
 */
router.post('/login', login);

module.exports = router;
