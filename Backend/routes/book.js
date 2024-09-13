const express = require('express');
const router = express.Router();
const { getBook } = require('../controllers/getBookController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: The book ID
 *       example:
 *         id: 1
 */

/**
 * @swagger
 * /book/{id}:
 *  get:
 *    summary: Get a book by ID
 *    tags: [Book]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: Book found
 *      404:
 *        description: Book not found
 *      500:
 *        description: An error occurred while getting the book
 */

router.get('/book/:id', getBook);

module.exports = router;
