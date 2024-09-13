const express = require('express');
const { insertReview } = require('../controllers/reviewController');
const {authenticateToken} = require("../middlewares/authenticateToken");

const router = express.Router();

// Dodawanie recenzji do książki o określonym ID
router.post('/book/:id/add-review', authenticateToken, insertReview);

module.exports = router;
