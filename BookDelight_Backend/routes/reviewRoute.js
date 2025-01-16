const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const { postReview, getReviewById, postReviewVote, getAllReviews, getReviewVoteType} = require("../controllers/reviewController");


router.post('/book/:id/add-review', authenticateToken, postReview);
router.get('/book/:id/review/:reviewId', getReviewById);
router.get('/book/:id/reviews', getAllReviews);
router.post('/book/:id/review/:id_review/vote', authenticateToken, postReviewVote);

router.get('/review/:reviewId/vote-type', authenticateToken, getReviewVoteType);

module.exports = router;

/**
 * @swagger
 * /book/{id}/add-review:
 *   post:
 *     summary: Add a review to a book
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review:
 *                 type: string
 *                 example: "This is a review of the book."
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review added successfully.
 *                 reviewId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Review content is required.
 *       500:
 *         description: Internal server error during review addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the review.
 */

/**
 * @swagger
 * /book/{id}/review/{reviewId}:
 *   get:
 *     summary: Retrieve a review by its ID
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_review:
 *                   type: integer
 *                   example: 1
 *                 review_content:
 *                   type: string
 *                   example: "This is a review of the book."
 *                 review_author:
 *                   type: string
 *                   example: "Jane Doe"
 *                 review_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:34:56Z"
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Review not found.
 *       500:
 *         description: Internal server error during review retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the review.
 */

/**
 * @swagger
 * /book/{id}/reviews:
 *   get:
 *     summary: Retrieve all reviews for a book
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_review:
 *                     type: integer
 *                     example: 1
 *                   review_content:
 *                     type: string
 *                     example: "This is a review of the book."
 *                   review_author:
 *                     type: string
 *                     example: "Jane Doe"
 *                   review_date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:34:56Z"
 *       404:
 *         description: Reviews not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Reviews not found.
 *       500:
 *         description: Internal server error during reviews retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the reviews.
 */

/**
 * @swagger
 * /book/{id}/review/{id_review}/vote:
 *   post:
 *     summary: Vote on a review
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *       - in: path
 *         name: id_review
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voteType:
 *                 type: string
 *                 enum: [upvote, downvote]
 *                 example: "upvote"
 *     responses:
 *       201:
 *         description: Vote added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vote added successfully.
 *                 voteId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Vote type is required.
 *       500:
 *         description: Internal server error during vote addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the vote.
 */

/**
 * @swagger
 * /review/{reviewId}/vote-type:
 *   get:
 *     summary: Retrieve the vote type of a review
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Vote type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 voteType:
 *                   type: string
 *                   example: "upvote"
 *       404:
 *         description: Vote type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Vote type not found.
 *       500:
 *         description: Internal server error during vote type retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the vote type.
 */
