const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const {postCurrentlyReading, postCurrentlyReadingPage} = require("../controllers/userController");


router.post('/book/:id/add-currently-reading', authenticateToken, postCurrentlyReading);
router.post('/book/:id/update-currently-reading-page', authenticateToken, postCurrentlyReadingPage);
// router.post('/user/change-photo', authenticateToken, );
// router.get('/user/:id/currently-reading', );
// router.get('/user/:id/photo', );


module.exports = router;
