const {writeResult} = require("../utils/writeResult");
const {insertReply} = require("../services/reply/postReplyService");
const {getReply} = require("../services/reply/getReplyService");
const {addVote} = require("../services/reply/addReplyVotesService");
const {getManyReply} = require("../services/reply/getAllReplyService");


const postReply = async (req, res) => {
    const content = { description } = req.body;
    const userId = req.user.userId;
    const id_book = req.params.id;
    const id_review = req.params.reviewId;

    const { result, error, statusCode } = await insertReply(content, userId, id_book, id_review);

    writeResult(res, result, error, statusCode);
};

const postReplyVote = async (req, res) => {
    const { vote_type } = req.body;
    const userId = req.user.userId;
    const bookId = req.params.id;
    const reviewId = req.params.reviewId;
    const replyId = req.params.replyId;

    const { result, error, statusCode } = await addVote(vote_type, userId, bookId, reviewId, replyId);

    writeResult(res, result, error, statusCode);
};

const getReplyById = async (req, res) => {
    const id_book = req.params.id;
    const id_review = req.params.reviewId;
    const id_reply = req.params.replyId;


    const { result, error, statusCode } = await getReply(id_book, id_review, id_reply);

    writeResult(res, result, error, statusCode);
};

const getAllReply = async (req, res) => {
    const id_book = req.params.id;
    const id_review = req.params.reviewId;

    const { result, error, statusCode } = await getManyReply(id_book, id_review);

    writeResult(res, result, error, statusCode);
};


module.exports = {
    postReply,
    getReplyById,
    postReplyVote,
    getAllReply
};
