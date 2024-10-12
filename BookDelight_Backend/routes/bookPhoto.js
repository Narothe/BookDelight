const express = require('express');
const {getPhoto} = require("../controllers/getBookPhotoController");
const router = express.Router();

router.get('/book/:id/photo', getPhoto);

module.exports = router;
