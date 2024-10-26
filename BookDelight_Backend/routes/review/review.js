// const express = require('express');
// const router = express.Router();
// const { getReview } = require('../../controllers/review/getReviewController');
//
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
// router.get('/book/:id/review/:reviewId', getReview);
//
// module.exports = router;
