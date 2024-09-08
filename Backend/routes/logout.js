const express = require('express');
const router = express.Router();
const {logout} = require("../controllers/logoutController");
const {authenticateToken} = require("../middlewares/authenticateToken");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Logout:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Bearer token used to authenticate the user.
 *       example:
 *         token: Bearer secrettoken
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
 *         description: Session expired.
 *       500:
 *         description: An error occurred during logging out the user.
 *
 */
router.post('/logout', authenticateToken, logout);

module.exports = router;
