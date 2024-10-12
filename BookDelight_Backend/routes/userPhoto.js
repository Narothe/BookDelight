const express = require('express');
const {getPhoto} = require("../controllers/getUserPhotoController");

const router = express.Router();

router.get('/user/:id/photo', getPhoto);

module.exports = router;
