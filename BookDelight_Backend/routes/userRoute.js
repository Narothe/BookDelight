const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postCurrentlyReading, postCurrentlyReadingPage, getCurrentlyReading, getUserPhoto, postWishToRead, getWishToRead,
    postReadBook, getReadBooks, postFavorite
} = require("../controllers/userController");
const {uploadPhoto} = require("../controllers/addUserPhotoController");


router.post('/user/change-photo', authenticateToken, uploadPhoto);
router.get('/user/:id/photo', getUserPhoto);

router.get('/user/:id/currently-reading', getCurrentlyReading);
router.get('/user/:id/wish-to-read', getWishToRead);
router.get('/user/:id/read-book', getReadBooks);

router.post('/book/:id/add-wish-to-read', authenticateToken, postWishToRead);
router.post('/book/:id/add-read-book', authenticateToken, postReadBook);
router.post('/book/:id/add-favorite', authenticateToken, postFavorite);
router.post('/book/:id/add-currently-reading', authenticateToken, postCurrentlyReading);
router.post('/book/:id/update-currently-reading-page', authenticateToken, postCurrentlyReadingPage);


module.exports = router;
