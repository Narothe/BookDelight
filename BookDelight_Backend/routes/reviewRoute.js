const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const { postReview } = require("../controllers/reviewController");



router.post('/book/:id/add-review', authenticateToken, postReview);
// router.get('/book/:id/review/:reviewId', );
// router.get('/book/:id/reviews', );
// router.post('/book/:id/review/:id_review/vote', authenticateToken, );

module.exports = router;

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
//  *     Review:
//  *       type: object
//  *       required:
//  *         - description
//  *         - rating
//  *       properties:
//  *         description:
//  *           type: string
//  *           description: The review's description
//  *         rating:
//  *           type: integer
//  *           description: The review's rating
//  *       example:
//  *         description: Book review
//  *         rating: 10
//  */
//
// /**
//  * @swagger
//  * /book/{id}/add-review:
//  *   post:
//  *     summary: Add a review to a book
//  *     tags: [Review]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Review'
//  *     responses:
//  *       201:
//  *         description: Review added successfully
//  *       400:
//  *         description: Missing required fields
//  *       404:
//  *         description: Book not found
//  *       500:
//  *         description: An error occurred while adding the review
//  */



// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Review:
//  *       type: object
//  *       required:
//  *         - id_review
//  *         - id_book
//  *       properties:
//  *         id_review:
//  *           type: integer
//  *           description: The review ID
//  *         id_book:
//  *           type: integer
//  *           description: The book ID
//  *       example:
//  *         id_review: 1
//  *         id_book: 1
//  */
//
//
// /**
//  * @swagger
//  * /book/{id}/review/{reviewId}:
//  *   get:
//  *     summary: Get a review by ID
//  *     tags: [Review]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Review'
//  *     responses:
//  *       200:
//  *         description: Review found
//  *       404:
//  *         description: Review not found
//  *       500:
//  *         description: An error occurred while getting the review
//  */



// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     ReviewVote:
//  *       type: object
//  *       required:
//  *         - id_book
//  *         - id_review
//  *         - vote_type
//  *       properties:
//  *         id_book:
//  *           type: integer
//  *           description: The book ID
//  *         id_review:
//  *           type: integer
//  *           description: The review ID
//  *         vote_type:
//  *           type: integer
//  *           description: The vote type
//  *       example:
//  *         id_review: 1
//  *         id_book: 1
//  *         vote_type: upvote
//  */
//
// /**
//  * @swagger
//  * /book/{id}/review/{id_review}/vote:
//  *   post:
//  *     summary: Add a vote to a review
//  *     tags: [ReviewVote]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ReviewVote'
//  *     responses:
//  *       201:
//  *         description: Vote added successfully
//  *       400:
//  *         description: Missing required fields
//  *       404:
//  *         description: Review not found
//  *       500:
//  *         description: An error occurred while adding the vote
//  */
