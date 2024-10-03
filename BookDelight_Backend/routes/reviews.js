const express = require('express');
const {getReviews} = require("../controllers/getAllReviewsController");
const router = express.Router();

router.get('/book/:id/reviews', getReviews);

module.exports = router;
