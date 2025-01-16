const express = require("express");
const {authenticateToken} = require("../middlewares/authenticateToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {getDashboard, deleteReplyByAdmin, deleteReviewByAdmin} = require("../controllers/adminController");
const router = express.Router();


router.get('/admin/dashboard', authenticateToken, checkAdmin, getDashboard);

router.delete('/book/:id/review/:reviewId/reply', authenticateToken, checkAdmin, deleteReplyByAdmin);
router.delete('/book/:id/review/', authenticateToken, checkAdmin, deleteReviewByAdmin);

module.exports = router;

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Retrieve admin dashboard statistics
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   example: {
 *                     total_users: 120,
 *                     total_books: 250,
 *                     total_reviews: 500,
 *                     total_replies: 150
 *                   }
 *       404:
 *         description: Count stats not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Count stats not found
 *       500:
 *         description: Internal server error during stats retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the count stats.
 */

/**
 * @swagger
 * /book/{id}/review/{reviewId}/reply:
 *   delete:
 *     summary: Delete a reply by admin
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review
 *       - in: query
 *         name: replyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reply
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   example: { message: 'Reply deleted successfully' }
 *       404:
 *         description: Reply not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Reply not found
 *       500:
 *         description: Internal server error during reply deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred during deleting the reply.
 */

/**
 * @swagger
 * /book/{id}/review/:
 *   delete:
 *     summary: Delete a review by admin
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *       - in: query
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   example: { message: 'Review deleted successfully' }
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Review not found
 *       500:
 *         description: Internal server error during review deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred during deleting the review.
 */
