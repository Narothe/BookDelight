const express = require('express');
const {authenticateToken} = require("../middlewares/authenticateToken");
const {insertCurrentlyReading} = require("../controllers/addCurrentlyReadingController");
const router = express.Router();

router.post('/book/:id/add-current-reading', authenticateToken, insertCurrentlyReading);

module.exports = router;
