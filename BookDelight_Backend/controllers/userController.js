const {writeResult} = require("../utils/writeResult");
const {insertCurrentlyReading} = require("../services/user/addCurrentlyReadingService");
const {insertCurrentlyReadingPage} = require("../services/user/addCurrentlyReadingPageService");
const {showCurrentlyReading} = require("../services/user/getCurrentlyReadingService");
const {getPhoto} = require("../services/user/getUserPhotoService");
const {insertWishToRead} = require("../services/user/addWishToReadService");
const {showWishToRead} = require("../services/user/getWishToReadService");
const {insertReadBook} = require("../services/user/addReadBookService");
const {showReadBooks} = require("../services/user/getReadBookService");
const {insertFavorite} = require("../services/user/addFavoriteService");


const postCurrentlyReading = async (req, res) => {
    const id_book = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await insertCurrentlyReading(id_book, userId);

    writeResult(res, result, error, statusCode);
};

const postCurrentlyReadingPage = async (req, res) => {
    const id_book = req.params.id;
    const userId = req.user.userId;
    const { current_page } = req.body;


    const { result, error, statusCode } = await insertCurrentlyReadingPage(id_book, userId, current_page);

    writeResult(res, result, error, statusCode);
};

const getCurrentlyReading = async (req, res) => {
    const userId = req.params.id;

    const { result, error, statusCode } = await showCurrentlyReading(userId);

    writeResult(res, result, error, statusCode);
};

const getUserPhoto = async (req, res) => {
    const userId = req.params.id;

    const { result, error, statusCode } = await getPhoto(userId);

    writeResult(res, result, error, statusCode);
};

const postWishToRead = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await insertWishToRead(bookId, userId);

    writeResult(res, result, error, statusCode);
}

const getWishToRead = async (req, res) => {
    const userId = req.params.id;

    const { result, error, statusCode } = await showWishToRead(userId);

    writeResult(res, result, error, statusCode);
}

const postReadBook = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await insertReadBook(bookId, userId);

    writeResult(res, result, error, statusCode);
}

const getReadBooks = async (req, res) => {
    const userId = req.params.id;

    const { result, error, statusCode } = await showReadBooks(userId);

    writeResult(res, result, error, statusCode);
}

const postFavorite = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await insertFavorite(bookId, userId);

    writeResult(res, result, error, statusCode);
}


module.exports = {
    postCurrentlyReading,
    postCurrentlyReadingPage,
    getCurrentlyReading,
    getUserPhoto,
    postWishToRead,
    getWishToRead,
    postReadBook,
    getReadBooks,
    postFavorite
};
