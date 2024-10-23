const express = require('express');
const router = express.Router();
const {showCurrentlyReading} = require("../../controllers/user/getCurrentlyReadingController");

router.get('/user/:id/currently-reading', showCurrentlyReading);

module.exports = router;
