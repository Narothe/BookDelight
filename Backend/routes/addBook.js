const express = require('express');
const router = express.Router();
const {createBook} = require("../controllers/bookController");
const {authenticateToken} = require("../middlewares/authenticateToken");

router.post('/add-book', authenticateToken, createBook);

module.exports = router;
