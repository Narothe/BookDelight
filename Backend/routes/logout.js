const express = require('express');
const router = express.Router();
const {logout} = require("../controllers/logoutController");
const {authenticateToken} = require("../middlewares/authenticateToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     Logout:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: JWT Bearer
 *           description: The user's token
 *       example:
 *         token: secrettoken
*/

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Logout'
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       401:
 *         description: Token is required.
 *       403:
 *         description: Invalid token.
 */
router.post('/logout', authenticateToken, logout);

module.exports = router;
