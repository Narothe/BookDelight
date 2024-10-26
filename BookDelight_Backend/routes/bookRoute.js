const express = require('express');
const router = express.Router();
const { getBook, getPhoto, getBooks, postBook} = require('../controllers/bookController');
const {authenticateToken} = require("../middlewares/authenticateToken");

const {uploadPhoto} = require("../controllers/addBookPhotoController");

router.get('/book/:id', getBook);
router.get('/book/:id/photo', getPhoto);
router.get('/', getBooks);
router.post('/add-book', authenticateToken, postBook);
// router.post('/book/:id/add-photo', authenticateToken, postBookPhoto);

router.post('/book/:id/add-photo', authenticateToken, uploadPhoto);


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
//  *     Book:
//  *       type: object
//  *       required:
//  *         - title
//  *         - authors
//  *       properties:
//  *         title:
//  *           type: string
//  *           description: The book's title
//  *         publisher:
//  *           type: string
//  *           description: The book's publisher
//  *         publication_date:
//  *           type: date
//  *           description: The book's publication date
//  *         isbn:
//  *           type: integer
//  *           description: The book's ISBN
//  *         book_length:
//  *           type: integer
//  *           description: The book's length
//  *         authors:
//  *           type: array
//  *           description: The book's authors
//  *           items:
//  *             type: string
//  *         short_description:
//  *           type: string
//  *           description: The book's short description
//  *         long_description:
//  *           type: string
//  *           description: The book's long description
//  *         genres:
//  *           type: array
//  *           description: The book's genres
//  *           items:
//  *             type: string
//  *       example:
//  *         title: Book Title
//  *         publisher: Publisher
//  *         publication_date: 2021-01-01
//  *         isbn: 1234567890123
//  *         book_length: 200
//  *         authors:
//  *           - Author1
//  *           - Author2
//  *         short_description: Short description
//  *         long_description: Long description
//  *         genres:
//  *           - novels
//  *           - scifi
//  */
//
// /**
//  * @swagger
//  * /add-book:
//  *   post:
//  *     summary: Add a book
//  *     tags: [Book]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Book'
//  *     responses:
//  *       201:
//  *         description: Book added successfully.
//  *       400:
//  *         description: Title, authors, both descriptions are required.
//  *       500:
//  *         description: An error occurred while adding the book.
//  */
