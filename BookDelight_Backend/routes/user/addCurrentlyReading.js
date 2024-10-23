const express = require('express');
const {authenticateToken} = require("../../middlewares/authenticateToken");
const {insertCurrentlyReading} = require("../../controllers/user/addCurrentlyReadingController");
const router = express.Router();

router.post('/book/:id/add-currently-reading', authenticateToken, insertCurrentlyReading);

module.exports = router;
