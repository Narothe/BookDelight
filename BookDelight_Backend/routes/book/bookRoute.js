const express = require('express');
const router = express.Router();
const { getBook, getPhoto, getBooks} = require('../../controllers/book/bookController');

router.get('/book/:id', getBook);
router.get('/book/:id/photo', getPhoto);
router.get('/', getBooks);

module.exports = router;


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Book:
//  *       type: object
//  *       required:
//  *         - id
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The book ID
//  *       example:
//  *         id: 1
//  */
//
// /**
//  * @swagger
//  * /book/{id}:
//  *  get:
//  *    summary: Get a book by ID
//  *    tags: [Book]
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/Book'
//  *    responses:
//  *      200:
//  *        description: Book found
//  *      404:
//  *        description: Book not found
//  *      500:
//  *        description: An error occurred while getting the book
//  */


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Book:
//  *       type: object
//  */
//
// /**
//  * @swagger
//  * /:
//  *  get:
//  *    summary: Get a books
//  *    tags: [Book]
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/Book'
//  *    responses:
//  *      200:
//  *        description: Books found
//  *      404:
//  *        description: Books not found
//  *      500:
//  *        description: An error occurred while getting the books
//  */
