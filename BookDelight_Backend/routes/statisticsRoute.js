const express = require('express');
const {getStatistics, getStatisticsDashboard} = require("../controllers/statisticsCotroller");
const router = express.Router();

router.post('/statistics/', getStatistics);
router.get('/statistics/dashboard', getStatisticsDashboard);

module.exports = router;

/**
 * @swagger
 * /statistics/:
 *   post:
 *     summary: Retrieve statistical data based on a specified date range
 *     tags:
 *       - Statistics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_range:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Date range for statistics (1-5)
 *                 example: 3
 *     responses:
 *       200:
 *         description: Statistical data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     results:
 *                       type: object
 *                       properties:
 *                         created_books:
 *                           type: integer
 *                           example: 42
 *                         created_users:
 *                           type: integer
 *                           example: 15
 *                         created_reviews:
 *                           type: integer
 *                           example: 60
 *                         created_replies:
 *                           type: integer
 *                           example: 30
 *                         added_to_currently:
 *                           type: integer
 *                           example: 25
 *                         added_to_wish_to_read:
 *                           type: integer
 *                           example: 35
 *                         added_to_read_books:
 *                           type: integer
 *                           example: 45
 *                         added_to_favorites:
 *                           type: integer
 *                           example: 20
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required fields
 *       500:
 *         description: Internal server error during statistics retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the statistics.
 */

/**
 * @swagger
 * /statistics/dashboard:
 *   get:
 *     summary: Retrieve dashboard statistics
 *     tags:
 *       - Statistics
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
 *                     book_count: 120,
 *                     users_count: 250,
 *                     review_count: 500,
 *                     reply_count: 150,
 *                     review_votes_count: 150,
 *                     reply_votes_count: 150,
 *                     genres_count: 150,
 *                     authors_count: 150,
 *                     currently_count: 150,
 *                     read_count: 150,
 *                     wish_count: 150,
 *                     favorite_count: 150,
 *                     read_pages_amount: 150,
 *                     logged_ever_users: 150,
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
 *         description: Internal server error during dashboard stats retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the count stats.
 */
