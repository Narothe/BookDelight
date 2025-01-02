const {writeResult} = require("../utils/writeResult");
const {insertReview} = require("../services/review/postReviewService");
const {addReviewVote} = require("../services/review/addReviewVotesService");
const {getReview} = require("../services/review/getReviewService");
const {getReviews} = require("../services/review/getAllReviewsService");
const {getVoteType} = require("../services/review/getVoteTypeService");


const postReview = async (req, res) => {
    const content = { description, rating } = req.body;
    const userId = req.user.userId;
    const id_book = req.params.id;

    const { result, error, statusCode } = await insertReview(content, userId, id_book);

    writeResult(res, result, error, statusCode);
};

const postReviewVote = async (req, res) => {
    const { id_review } = req.params;
    const { vote_type } = req.body;
    const userId = req.user.userId;
    const bookId = req.params.id;

    const { result, error, statusCode } = await addReviewVote(id_review, vote_type, userId, bookId);

    writeResult(res, result, error, statusCode);
};

const getReviewById = async (req, res) => {
    const id_review = req.params.reviewId;
    const id_book = req.params.id;

    const { result, error, statusCode } = await getReview(id_review, id_book);

    writeResult(res, result, error, statusCode);
};

const getAllReviews = async (req, res) => {
    const id_book = req.params.id;

    const { result, error, statusCode } = await getReviews(id_book);

    writeResult(res, result, error, statusCode);
};

const getReviewVoteType = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.userId;

    const { result, error, statusCode } = await getVoteType(reviewId, userId);

    writeResult(res, result, error, statusCode);
}


module.exports = {
    postReview,
    getReviewById,
    postReviewVote,
    getAllReviews,
    getReviewVoteType
};
