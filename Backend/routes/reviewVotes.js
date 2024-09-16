const express = require('express');
const {authenticateToken} = require("../middlewares/authenticateToken");
const {addVote} = require("../controllers/addReviewVotesController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewVote:
 *       type: object
 *       required:
 *         - id_book
 *         - id_review
 *         - vote_type
 *       properties:
 *         id_book:
 *           type: integer
 *           description: The book ID
 *         id_review:
 *           type: integer
 *           description: The review ID
 *         vote_type:
 *           type: integer
 *           description: The vote type
 *       example:
 *         id_review: 1
 *         id_book: 1
 *         vote_type: upvote
 */

/**
 * @swagger
 * /book/{id}/review/{id_review}/vote:
 *   post:
 *     summary: Add a vote to a review
 *     tags: [ReviewVote]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewVote'
 *     responses:
 *       201:
 *         description: Vote added successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Review not found
 *       500:
 *         description: An error occurred while adding the vote
 */

router.post('/book/:id/review/:id_review/vote', authenticateToken, addVote);

module.exports = router;
