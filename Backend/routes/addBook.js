const express = require('express');
const router = express.Router();
const {insertBook} = require("../controllers/bookController");
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
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authors
 *       properties:
 *         title:
 *           type: string
 *           description: The book's title
 *         publisher:
 *           type: string
 *           description: The book's publisher
 *         publication_date:
 *           type: date
 *           description: The book's publication date
 *         isbn:
 *           type: integer
 *           description: The book's ISBN
 *         book_length:
 *           type: integer
 *           description: The book's length
 *         photo_path:
 *           type: string
 *           description: The book's photo path
 *         authors:
 *           type: array
 *           description: The book's authors
 *           items:
 *             type: string
 *         short_description:
 *           type: string
 *           description: The book's short description
 *         long_description:
 *           type: string
 *           description: The book's long description
 *         genres:
 *           type: array
 *           description: The book's genres
 *           items:
 *             type: string
 *       example:
 *         title: Book Title
 *         publisher: Publisher
 *         publication_date: 2021-01-01
 *         isbn: 1234567890123
 *         book_length: 200
 *         photo_path: /path/to/photo.jpg
 *         authors:
 *           - Author1
 *           - Author2
 *         short_description: Short description
 *         long_description: Long description
 *         genres:
 *           - novels
 *           - scifi
 */

/**
 * @swagger
 * /add-book:
 *   post:
 *     summary: Add a book
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book added successfully.
 *       400:
 *         description: Title, authors, both descriptions are required.
 *       500:
 *         description: An error occurred while adding the book.
 */
router.post('/add-book', authenticateToken, insertBook);

module.exports = router;
