const express = require('express');
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postLogin, postLogout, postRegister, postVerify, getVerifyToken, getVerified} = require("../controllers/authController");
const router = express.Router();


router.post('/login', postLogin);
router.post('/logout', authenticateToken, postLogout);
router.post('/register', postRegister);
router.post('/user/verify', authenticateToken, postVerify);
router.get('/verify-email', getVerifyToken);
router.get('/user/is-verified', authenticateToken, getVerified);

module.exports = router;



// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Login:
//  *       type: object
//  *       required:
//  *         - identity
//  *         - password
//  *       properties:
//  *         identity:
//  *           type: string
//  *           description: The user's email
//  *         password:
//  *           type: string
//  *           description: The user's password
//  *       example:
//  *         identity: user@example.com
//  *         password: SecurePassword123
//  */
//
// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     summary: Login a user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Login'
//  *     responses:
//  *       200:
//  *         description: User logged in successfully.
//  *       400:
//  *         description: Email and password are required.
//  *       401:
//  *         description: Invalid password or email.
//  *       500:
//  *         description: An error occurred during logging in the user.
//  */



// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     bearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *
//  *   schemas:
//  *     Logout:
//  *       type: object
//  */
//
// /**
//  * @swagger
//  * /logout:
//  *   post:
//  *     summary: Logout a user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Logout'
//  *     responses:
//  *       200:
//  *         description: User logged out successfully.
//  *       401:
//  *         description: Token is required.
//  *       403:
//  *         description: Session expired.
//  *       500:
//  *         description: An error occurred during logging out the user.
//  *
//  */





// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Register:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *         - username
//  *         - firstName
//  *         - lastName
//  *         - birthDay
//  *         - birthMonth
//  *         - birthYear
//  *       properties:
//  *         email:
//  *           type: string
//  *           description: The user's email (must be unique)
//  *         password:
//  *           type: string
//  *           description: The user's password
//  *         username:
//  *           type: string
//  *           description: The user's username (must be unique)
//  *         firstName:
//  *           type: string
//  *           description: The user's first name
//  *         lastName:
//  *           type: string
//  *           description: The user's last name
//  *         birthDay:
//  *           type: integer
//  *           description: The user's birth day
//  *         birthMonth:
//  *           type: integer
//  *           description: The user's birth month
//  *         birthYear:
//  *           type: integer
//  *           description: The user's birth year. Year must be number bigger than 1800
//  *       example:
//  *         email: user@example.com
//  *         password: SecurePassword123
//  *         username: username123
//  *         firstName: John
//  *         lastName: Doe
//  *         birthDay: 15
//  *         birthMonth: 8
//  *         birthYear: 1990
//  */
//
// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *           $ref: '#/components/schemas/Register'
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
