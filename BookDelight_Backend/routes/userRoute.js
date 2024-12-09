const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postCurrentlyReading, postCurrentlyReadingPage, getCurrentlyReading, getUserPhoto, postWishToRead, getWishToRead,
    postReadBook, getReadBooks, postFavorite, getFavoriteBooks, postUserGenrePreferences, postUserAuthorPreferences,
    deleteWishToRead, deleteFavorite, deleteReadBook, deleteCurrentlyReading, postCollectUserData, getUser
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

router.get('/user/:id', getUser)

module.exports = router;
