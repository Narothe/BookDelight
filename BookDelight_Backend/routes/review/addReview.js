const express = require('express');
const { insertReview } = require('../../controllers/review/addReviewController');
const {authenticateToken} = require("../../middlewares/authenticateToken");

const router = express.Router();

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
 *     Review:
 *       type: object
 *       required:
 *         - description
 *         - rating
 *       properties:
 *         description:
 *           type: string
 *           description: The review's description
 *         rating:
 *           type: integer
 *           description: The review's rating
 *       example:
 *         description: Book review
 *         rating: 10
 */

/**
 * @swagger
 * /book/{id}/add-review:
 *   post:
 *     summary: Add a review to a book
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Book not found
 *       500:
 *         description: An error occurred while adding the review
 */

router.post('/book/:id/add-review', authenticateToken, insertReview);

module.exports = router;
