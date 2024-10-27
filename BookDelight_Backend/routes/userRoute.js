const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postCurrentlyReading, postCurrentlyReadingPage, getCurrentlyReading, getUserPhoto} = require("../controllers/userController");
const {uploadPhoto} = require("../controllers/addUserPhotoController");


router.post('/book/:id/add-currently-reading', authenticateToken, postCurrentlyReading);
router.post('/book/:id/update-currently-reading-page', authenticateToken, postCurrentlyReadingPage);
router.post('/user/change-photo', authenticateToken, uploadPhoto);
router.get('/user/:id/currently-reading', getCurrentlyReading);
router.get('/user/:id/photo', getUserPhoto);


module.exports = router;
