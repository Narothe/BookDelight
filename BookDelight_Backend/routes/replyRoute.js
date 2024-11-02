const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const { postReply, getReplyById, postReplyVote, getAllReply} = require("../controllers/replyController");


router.post('/book/:id/review/:reviewId/add-reply', authenticateToken, postReply);
router.get('/book/:id/review/:reviewId/reply/:replyId', getReplyById);

router.get('/book/:id/review/:reviewId/all-reply', getAllReply);
router.post('/book/:id/review/:reviewId/reply/:replyId/vote', authenticateToken, postReplyVote);

module.exports = router;
