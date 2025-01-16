const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const { postReply, getReplyById, postReplyVote, getAllReply, getReplyVoteType} = require("../controllers/replyController");


router.post('/book/:id/review/:reviewId/add-reply', authenticateToken, postReply);
router.get('/book/:id/review/:reviewId/reply/:replyId', getReplyById);

router.get('/book/:id/review/:reviewId/all-reply', getAllReply);
router.post('/book/:id/review/:reviewId/reply/:replyId/vote', authenticateToken, postReplyVote);

router.get('/reply/:replyId/vote-type', authenticateToken, getReplyVoteType);


module.exports = router;

/**
 * @swagger
 * /book/{id}/review/{reviewId}/add-reply:
 *   post:
 *     summary: Add a reply to a review
 *     tags:
 *       - Reply
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
 *         name: reviewId
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
 *               description:
 *                 type: string
 *                 example: "This is a reply to the review."
 *     responses:
 *       201:
 *         description: Reply added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reply added successfully.
 *                 replyId:
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
 *                   example: Reply content is required.
 *       500:
 *         description: Internal server error during reply addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the reply.
 */

/**
 * @swagger
 * /book/{id}/review/{reviewId}/reply/{replyId}:
 *   get:
 *     summary: Retrieve a reply by its ID
 *     tags:
 *       - Reply
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
 *       - in: path
 *         name: replyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the reply
 *     responses:
 *       200:
 *         description: Reply retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_reply:
 *                   type: integer
 *                   example: 1
 *                 reply_content:
 *                   type: string
 *                   example: "This is a reply to the review."
 *                 reply_author:
 *                   type: string
 *                   example: "John Doe"
 *                 reply_date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:34:56Z"
 *       404:
 *         description: Reply not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Reply not found.
 *       500:
 *         description: Internal server error during reply retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the reply.
 */

/**
 * @swagger
 * /book/{id}/review/{reviewId}/all-reply:
 *   get:
 *     summary: Retrieve all replies for a review
 *     tags:
 *       - Reply
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
 *         description: Replies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_reply:
 *                     type: integer
 *                     example: 1
 *                   reply_content:
 *                     type: string
 *                     example: "This is a reply to the review."
 *                   reply_author:
 *                     type: string
 *                     example: "John Doe"
 *                   reply_date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:34:56Z"
 *       404:
 *         description: Replies not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Replies not found.
 *       500:
 *         description: Internal server error during replies retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the replies.
 */

/**
 * @swagger
 * /book/{id}/review/{reviewId}/reply/{replyId}/vote:
 *   post:
 *     summary: Vote on a reply
 *     tags:
 *       - Reply
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
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the review
 *       - in: path
 *         name: replyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the reply
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
 * /reply/{replyId}/vote-type:
 *   get:
 *     summary: Retrieve the vote type of a reply
 *     tags:
 *       - Reply
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: replyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the reply
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
