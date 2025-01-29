const {writeResult} = require("../utils/writeResult");
const {adminDashboard} = require("../services/admin/getDashboardService");
const {adminDeleteReply} = require("../services/admin/deleteReplyService");
const {adminDeleteReview} = require("../services/admin/deleteReviewService");
const {adminDeleteBook} = require("../services/admin/deleteBookService");

const getDashboard = async (req, res) => {
    const userId = req.user.userId;
    // const isAdmin = req.user.isAdmin;

    const { result, error, statusCode } = await adminDashboard(userId);

    writeResult(res, result, error, statusCode);
}

const deleteReplyByAdmin = async (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewId;
    const replyId = req.body;

    const { result, error, statusCode } = await adminDeleteReply(id, reviewId, replyId.replyId);

    writeResult(res, result, error, statusCode);
}

const deleteReviewByAdmin = async (req, res) => {
    const id = req.params.id;
    const reviewId = req.body;

    const { result, error, statusCode } = await adminDeleteReview(id, reviewId.reviewId);

    writeResult(res, result, error, statusCode);
}

const deleteBookByAdmin = async (req, res) => {
    const bookId = req.body;

    const { result, error, statusCode } = await adminDeleteBook(bookId.bookId);

    writeResult(res, result, error, statusCode);
}

module.exports = {
    getDashboard,
    deleteReplyByAdmin,
    deleteReviewByAdmin,
    deleteBookByAdmin
};
