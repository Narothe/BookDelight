const express = require('express');
const router = express.Router();
const { getBooks } = require('../../controllers/book/getAllBooksController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 */

/**
 * @swagger
 * /:
 *  get:
 *    summary: Get a books
 *    tags: [Book]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: Books found
 *      404:
 *        description: Books not found
 *      500:
 *        description: An error occurred while getting the books
 */

router.get('/', getBooks);

module.exports = router;
