const express = require('express');
const {uploadPhoto} = require("../controllers/addPhotoController");
const {authenticateToken} = require("../middlewares/authenticateToken");
const router = express.Router();

router.post('/book/:id/add-photo', authenticateToken, uploadPhoto);

module.exports = router;
