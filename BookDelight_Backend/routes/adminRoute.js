const express = require("express");
const {authenticateToken} = require("../middlewares/authenticateToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {getDashboard, deleteReplyByAdmin} = require("../controllers/adminController");
const router = express.Router();


router.get('/admin/dashboard', authenticateToken, checkAdmin, getDashboard);

router.delete('/book/:id/review/:reviewId/reply', authenticateToken, checkAdmin, deleteReplyByAdmin);

module.exports = router;
