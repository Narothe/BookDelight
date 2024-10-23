const express = require('express');
const {authenticateToken} = require("../../middlewares/authenticateToken");
const {uploadPhoto} = require("../../controllers/book/addBookPhotoController");
const router = express.Router();

router.post('/book/:id/add-photo', authenticateToken, uploadPhoto);

module.exports = router;
