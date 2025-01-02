const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middlewares/authenticateToken");
const { postReply, getReplyById, postReplyVote, getAllReply, getReplyVoteType} = require("../controllers/replyController");


router.post('/book/:id/review/:reviewId/add-reply', authenticateToken, postReply);
router.get('/book/:id/review/:reviewId/reply/:replyId', getReplyById);

router.get('/book/:id/review/:reviewId/all-reply', getAllReply);
router.post('/book/:id/review/:reviewId/reply/:replyId/vote', authenticateToken, postReplyVote);

router.get('/reply/:replyId/vote-type', authenticateToken, getReplyVoteType);


module.exports = router;
