const {writeResult} = require("../utils/writeResult");
const {adminDashboard} = require("../services/admin/getDashboardService");
const {adminDeleteReply} = require("../services/admin/deleteReplyService");

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

module.exports = {
    getDashboard,
    deleteReplyByAdmin
};
