const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postCurrentlyReading, postCurrentlyReadingPage, getCurrentlyReading, getUserPhoto, postWishToRead, getWishToRead} = require("../controllers/userController");
const {uploadPhoto} = require("../controllers/addUserPhotoController");


router.post('/user/change-photo', authenticateToken, uploadPhoto);
router.get('/user/:id/photo', getUserPhoto);

router.get('/user/:id/currently-reading', getCurrentlyReading);
router.get('/user/:id/wish-to-read', getWishToRead);

router.post('/book/:id/add-wish-to-read', authenticateToken, postWishToRead);
router.post('/book/:id/add-currently-reading', authenticateToken, postCurrentlyReading);
router.post('/book/:id/update-currently-reading-page', authenticateToken, postCurrentlyReadingPage);


module.exports = router;
