const express = require('express');
const router = express.Router();
const {createBook} = require("../controllers/bookController");

router.post('/add-book', createBook);

module.exports = router;
