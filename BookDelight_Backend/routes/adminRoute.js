const express = require("express");
const {authenticateToken} = require("../middlewares/authenticateToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {getDashboard} = require("../controllers/adminController");
const router = express.Router();


router.get('/admin/dashboard', authenticateToken, checkAdmin, getDashboard);

module.exports = router;
