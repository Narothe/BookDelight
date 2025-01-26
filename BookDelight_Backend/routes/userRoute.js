const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postCurrentlyReading, postCurrentlyReadingPage, getCurrentlyReading, getUserPhoto, postWishToRead, getWishToRead,
    postReadBook, getReadBooks, postFavorite, getFavoriteBooks, postUserGenrePreferences, postUserAuthorPreferences,
    deleteWishToRead, deleteFavorite, deleteReadBook, deleteCurrentlyReading, postCollectUserData, getUser,
    recommendBooks, showLoggedInfo,
} = require("../controllers/userController");
const {uploadPhoto} = require("../controllers/addUserPhotoController");


router.post('/user/change-photo', authenticateToken, uploadPhoto);
router.get('/user/:id/photo', getUserPhoto);

router.get('/user/:id/currently-reading', getCurrentlyReading);
router.get('/user/:id/wish-to-read', getWishToRead);
router.get('/user/:id/read-book', getReadBooks);
router.get('/user/:id/favorite', getFavoriteBooks);

router.delete('/book/:id/delete-wish-to-read', authenticateToken, deleteWishToRead);
router.delete('/book/:id/delete-favorite', authenticateToken, deleteFavorite);
router.delete('/book/:id/delete-read-book', authenticateToken, deleteReadBook);
router.delete('/book/:id/currently-reading', authenticateToken, deleteCurrentlyReading);

router.post('/book/:id/add-wish-to-read', authenticateToken, postWishToRead);
router.post('/book/:id/add-read-book', authenticateToken, postReadBook);
router.post('/book/:id/add-favorite', authenticateToken, postFavorite);
router.post('/book/:id/add-currently-reading', authenticateToken, postCurrentlyReading);
router.post('/book/:id/update-currently-reading-page', authenticateToken, postCurrentlyReadingPage);

router.post('/user/add-genre-preferences', authenticateToken, postUserGenrePreferences);
router.post('/user/add-author-preferences', authenticateToken, postUserAuthorPreferences);

router.post('/user/collect-user-data', authenticateToken, postCollectUserData);

router.get('/recommendations', authenticateToken, recommendBooks);

router.get('/user/logged', authenticateToken, showLoggedInfo);

router.get('/user/:id', getUser);

module.exports = router;

/**
 * @swagger
 * /user/change-photo:
 *   post:
 *     summary: Change the user's photo
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
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
 *                 description: The photo file to upload
 *     responses:
 *       200:
 *         description: Photo changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Photo changed successfully.
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Photo file is required.
 *       500:
 *         description: Internal server error during photo change
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while changing the photo.
 */

/**
 * @swagger
 * /user/{id}/photo:
 *   get:
 *     summary: Retrieve the user's photo
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User photo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoUrl:
 *                   type: string
 *                   example: "https://example.com/photos/user1.jpg"
 *       404:
 *         description: User photo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User photo not found.
 *       500:
 *         description: Internal server error during photo retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the user photo.
 */

/**
 * @swagger
 * /user/{id}/currently-reading:
 *   get:
 *     summary: Retrieve the currently reading books of a user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Currently reading books retrieved successfully
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
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   current_page:
 *                     type: integer
 *                     example: 50
 *       404:
 *         description: Currently reading books not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Currently reading books not found.
 *       500:
 *         description: Internal server error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the currently reading books.
 */

/**
 * @swagger
 * /user/{id}/wish-to-read:
 *   get:
 *     summary: Retrieve the user's wish-to-read books
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Wish-to-read books retrieved successfully
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
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *       404:
 *         description: Wish-to-read books not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Wish-to-read books not found.
 *       500:
 *         description: Internal server error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the wish-to-read books.
 */

/**
 * @swagger
 * /user/{id}/read-book:
 *   get:
 *     summary: Retrieve the user's read books
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Read books retrieved successfully
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
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *       404:
 *         description: Read books not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Read books not found.
 *       500:
 *         description: Internal server error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the read books.
 */

/**
 * @swagger
 * /user/{id}/favorite:
 *   get:
 *     summary: Retrieve the user's favorite books
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Favorite books retrieved successfully
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
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *       404:
 *         description: Favorite books not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Favorite books not found.
 *       500:
 *         description: Internal server error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the favorite books.
 */

/**
 * @swagger
 * /book/{id}/delete-wish-to-read:
 *   delete:
 *     summary: Delete a wish-to-read book
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Wish-to-read book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wish-to-read book deleted successfully.
 *       404:
 *         description: Wish-to-read book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Wish-to-read book not found.
 *       500:
 *         description: Internal server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting the wish-to-read book.
 */

/**
 * @swagger
 * /book/{id}/delete-favorite:
 *   delete:
 *     summary: Delete a favorite book
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Favorite book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Favorite book deleted successfully.
 *       404:
 *         description: Favorite book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Favorite book not found.
 *       500:
 *         description: Internal server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting the favorite book.
 */

/**
 * @swagger
 * /book/{id}/delete-read-book:
 *   delete:
 *     summary: Delete a read book
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Read book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Read book deleted successfully.
 *       404:
 *         description: Read book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Read book not found.
 *       500:
 *         description: Internal server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting the read book.
 */

/**
 * @swagger
 * /book/{id}/currently-reading:
 *   delete:
 *     summary: Delete a currently reading book
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Currently reading book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Currently reading book deleted successfully.
 *       404:
 *         description: Currently reading book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Currently reading book not found.
 *       500:
 *         description: Internal server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while deleting the currently reading book.
 */

/**
 * @swagger
 * /book/{id}/add-wish-to-read:
 *   post:
 *     summary: Add a book to wish-to-read list
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Book added to wish-to-read list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book added to wish-to-read list successfully.
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
 *         description: Internal server error during addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the book to wish-to-read list.
 */

/**
 * @swagger
 * /book/{id}/add-read-book:
 *   post:
 *     summary: Add a book to read list
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Book added to read list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book added to read list successfully.
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
 *         description: Internal server error during addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the book to read list.
 */

/**
 * @swagger
 * /book/{id}/add-favorite:
 *   post:
 *     summary: Add a book to favorite list
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Book added to favorite list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book added to favorite list successfully.
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
 *         description: Internal server error during addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the book to favorite list.
 */

/**
 * @swagger
 * /book/{id}/add-currently-reading:
 *   post:
 *     summary: Add a book to currently reading list
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Book added to currently reading list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book added to currently reading list successfully.
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
 *         description: Internal server error during addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the book to currently reading list.
 */

/**
 * @swagger
 * /book/{id}/update-currently-reading-page:
 *   post:
 *     summary: Update the current page of a currently reading book
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               current_page:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Current page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Current page updated successfully.
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
 *         description: Internal server error during update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while updating the current page.
 */

/**
 * @swagger
 * /user/add-genre-preferences:
 *   post:
 *     summary: Add genre preferences for a user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fiction", "Science Fiction"]
 *     responses:
 *       200:
 *         description: Genre preferences added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Genre preferences added successfully.
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Genres are required.
 *       500:
 *         description: Internal server error during addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding genre preferences.
 */

/**
 * @swagger
 * /user/add-author-preferences:
 *   post:
 *     summary: Add author preferences for a user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["F. Scott Fitzgerald", "J.K. Rowling"]
 *     responses:
 *       200:
 *         description: Author preferences added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author preferences added successfully.
 *       400:
 *         description: Bad request - validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Authors are required.
 *       500:
 *         description: Internal server error during addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding author preferences.
 */

/**
 * @swagger
 * /user/collect-user-data:
 *   post:
 *     summary: Collect user data
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data collected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User data collected successfully.
 *       500:
 *         description: Internal server error during data collection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while collecting user data.
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve user information
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving user information.
 */

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Get book recommendations
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book recommendations retrieved successfully
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
 *                   book_author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *       500:
 *         description: Internal server error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving book recommendations.
 */
