const express = require('express');
const router = express.Router();
const { getBook, getPhoto, getBooks, postBook, getAllBookAuthors, getAllBookGenres, searchBookGenre, searchBookAuthor,
    searchBook
} = require('../controllers/bookController');
const {authenticateToken} = require("../middlewares/authenticateToken");

const {uploadPhoto} = require("../controllers/addBookPhotoController");

router.get('/book/:id', getBook);
router.get('/book/:id/photo', getPhoto);
router.get('/', getBooks);
router.post('/add-book', authenticateToken, postBook);
router.post('/book/:id/add-photo', authenticateToken, uploadPhoto);

router.get('/authors', getAllBookAuthors);
router.get('/genres', getAllBookGenres);

router.post('/search-genre', searchBookGenre);
router.post('/search-author', searchBookAuthor);

router.post('/book/search', searchBook);

module.exports = router;

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Retrieve book by ID
 *     tags:
 *       - Book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id_book:
 *                       type: integer
 *                       example: 1
 *                     book_title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                     book_description:
 *                       type: string
 *                       example: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
 *                     book_author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                     book_genre:
 *                       type: string
 *                       example: "Fiction"
 *                     book_pages:
 *                       type: integer
 *                       example: 180
 *                     book_year:
 *                       type: integer
 *                       example: 1925
 *                     book_rating:
 *                       type: integer
 *                       example: 4
 *                     book_votes:
 *                       type: integer
 *                       example: 100
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Book not found
 *       500:
 *         description: Internal server error during book retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the book.
 */

/**
 * @swagger
 * /book/{id}/photo:
 *   get:
 *     summary: Retrieve photo of a book by ID
 *     tags:
 *       - Book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve the photo for
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Book photo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     photo_url:
 *                       type: string
 *                       example: "http://example.com/photos/book1.jpg"
 *       404:
 *         description: Book photo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Book photo not found
 *       500:
 *         description: Internal server error during book photo retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the book photo.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags:
 *       - Book
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_book:
 *                     type: integer
 *                     example: 1
 *                   book_title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   book_description:
 *                     type: string
 *                     example: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   book_genre:
 *                     type: string
 *                     example: "Fiction"
 *                   book_pages:
 *                     type: integer
 *                     example: 180
 *                   book_year:
 *                     type: integer
 *                     example: 1925
 *                   book_rating:
 *                     type: integer
 *                     example: 4
 *                   book_votes:
 *                     type: integer
 *                     example: 100
 *       500:
 *         description: Internal server error during book list retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the list of books.
 */

/**
 * @swagger
 * /add-book:
 *   post:
 *     summary: Add a new book
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               book_description:
 *                 type: string
 *                 example: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
 *               book_author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               book_genre:
 *                 type: string
 *                 example: "Fiction"
 *               book_pages:
 *                 type: integer
 *                 example: 180
 *               book_year:
 *                 type: integer
 *                 example: 1925
 *               book_rating:
 *                 type: integer
 *                 example: 4
 *               book_votes:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Book added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Book added successfully.
 *                     bookId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are required.
 *       500:
 *         description: Internal server error during book addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the book.
 */

/**
 * @swagger
 * /book/{id}/add-photo:
 *   post:
 *     summary: Add a photo to a book by ID
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to add the photo to
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Photo added successfully.
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid photo format.
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Book not found.
 *       500:
 *         description: Internal server error during photo upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while uploading the photo.
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve a list of all book authors
 *     tags:
 *       - Book
 *     responses:
 *       200:
 *         description: List of authors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   author_id:
 *                     type: integer
 *                     example: 1
 *                   author_name:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *       500:
 *         description: Internal server error during author list retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the list of authors.
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Retrieve a list of all book genres
 *     tags:
 *       - Book
 *     responses:
 *       200:
 *         description: List of genres retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   genre_id:
 *                     type: integer
 *                     example: 1
 *                   genre_name:
 *                     type: string
 *                     example: "Fiction"
 *       500:
 *         description: Internal server error during genre list retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while getting the list of genres.
 */

/**
 * @swagger
 * /search-genre:
 *   post:
 *     summary: Search for books by genre
 *     tags:
 *       - Book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_book:
 *                     type: integer
 *                     example: 1
 *                   book_title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   book_description:
 *                     type: string
 *                     example: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   book_genre:
 *                     type: string
 *                     example: "Fiction"
 *                   book_pages:
 *                     type: integer
 *                     example: 180
 *                   book_year:
 *                     type: integer
 *                     example: 1925
 *                   book_rating:
 *                     type: integer
 *                     example: 4
 *                   book_votes:
 *                     type: integer
 *                     example: 100
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Genre is required.
 *       500:
 *         description: Internal server error during genre search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while searching for books by genre.
 */

/**
 * @swagger
 * /search-author:
 *   post:
 *     summary: Search for books by author
 *     tags:
 *       - Book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_book:
 *                     type: integer
 *                     example: 1
 *                   book_title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   book_description:
 *                     type: string
 *                     example: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   book_genre:
 *                     type: string
 *                     example: "Fiction"
 *                   book_pages:
 *                     type: integer
 *                     example: 180
 *                   book_year:
 *                     type: integer
 *                     example: 1925
 *                   book_rating:
 *                     type: integer
 *                     example: 4
 *                   book_votes:
 *                     type: integer
 *                     example: 100
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Author is required.
 *       500:
 *         description: Internal server error during author search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while searching for books by author.
 */

/**
 * @swagger
 * /book/search:
 *   post:
 *     summary: Search for books
 *     tags:
 *       - Book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: string
 *                 example: "Czysty"
 *               minLength:
 *                 type: integer
 *                 example: 30
 *               maxLength:
 *                 type: integer
 *                 example: 1000
 *               minRating:
 *                 type: integer
 *                 example: 5
 *               maxRating:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_book:
 *                     type: integer
 *                     example: 1
 *                   book_title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   book_description:
 *                     type: string
 *                     example: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald."
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   book_genre:
 *                     type: string
 *                     example: "Fiction"
 *                   book_pages:
 *                     type: integer
 *                     example: 180
 *                   book_year:
 *                     type: integer
 *                     example: 1925
 *                   book_rating:
 *                     type: integer
 *                     example: 4
 *                   book_votes:
 *                     type: integer
 *                     example: 100
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Query is required.
 *       500:
 *         description: Internal server error during book search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while searching for books.
 */
