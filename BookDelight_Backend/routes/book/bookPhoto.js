const express = require('express');
const {getPhoto} = require("../../controllers/book/getBookPhotoController");
const router = express.Router();

router.get('/book/:id/photo', getPhoto);

module.exports = router;
