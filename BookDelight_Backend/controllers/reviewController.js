const {writeResult} = require("../utils/writeResult");
const {insertReview} = require("../services/review/postReviewService");



const postReview = async (req, res) => {
    const content = { description, rating } = req.body;
    const userId = req.user.userId;
    const id_book = req.params.id;

    const { result, error, statusCode } = await insertReview(content, userId, id_book);

    writeResult(res, result, error, statusCode);
};


module.exports = { postReview };
