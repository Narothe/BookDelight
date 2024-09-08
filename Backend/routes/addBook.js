const express = require('express');
const router = express.Router();
const {insertBook} = require("../controllers/bookController");
const {authenticateToken} = require("../middlewares/authenticateToken");

router.post('/add-book', authenticateToken, insertBook);

module.exports = router;
