const express = require('express');
const {authenticateToken} = require("../../middlewares/authenticateToken");
const {uploadPhoto} = require("../../controllers/user/addUserPhotoController");
const router = express.Router();

router.post('/user/change-photo', authenticateToken, uploadPhoto);

module.exports = router;
