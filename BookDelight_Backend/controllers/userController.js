const {writeResult} = require("../utils/writeResult");
const {insertCurrentlyReading} = require("../services/user/addCurrentlyReadingService");
const {insertCurrentlyReadingPage} = require("../services/user/addCurrentlyReadingPageService");
const {showCurrentlyReading} = require("../services/user/getCurrentlyReadingService");
const {getPhoto} = require("../services/user/getUserPhotoService");
const {insertWishToRead} = require("../services/user/addWishToReadService");
const {showWishToRead} = require("../services/user/getWishToReadService");
const {insertReadBook} = require("../services/user/addReadBookService");
const {showReadBooks} = require("../services/user/getReadBookService");
const {insertFavorite} = require("../services/user/addFavoriteBookService");
const {showFavorite} = require("../services/user/getFavoriteBookService");
const {insertUserGenrePreferences, insertUserAuthorPreferences} = require("../services/user/addUserPreferencesService");
const {removeWishToRead, removeFavorite, removeReadBook, removeCurrentlyReading} = require("../services/user/deleteBooksBooksmarksService");
const {insertUserData} = require("../services/user/addUserDataService");
const {getUserData} = require("../services/user/getUserService");
const {getPreferences} = require("../services/user/getPreferencesService");
const {getUserLoggedInfo} = require("../services/user/getUserLoggedInfoService");


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

const getFavoriteBooks = async (req, res) => {
    const userId = req.params.id;

    const { result, error, statusCode } = await showFavorite(userId);

    writeResult(res, result, error, statusCode);
}

const postUserGenrePreferences = async (req, res) => {
    const userId = req.user.userId;
    const { genre } = req.body;

    const { result, error, statusCode } = await insertUserGenrePreferences(userId, genre);

    writeResult(res, result, error, statusCode);
}

const postUserAuthorPreferences = async (req, res) => {
    const userId = req.user.userId;
    const { author } = req.body;

    const { result, error, statusCode } = await insertUserAuthorPreferences(userId, author);

    writeResult(res, result, error, statusCode);
}

const deleteWishToRead = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await removeWishToRead(bookId, userId);

    writeResult(res, result, error, statusCode);
}

const deleteFavorite = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await removeFavorite(bookId, userId);

    writeResult(res, result, error, statusCode);
}

const deleteReadBook = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await removeReadBook(bookId, userId);

    writeResult(res, result, error, statusCode);
}

const deleteCurrentlyReading = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const { result, error, statusCode } = await removeCurrentlyReading(bookId, userId);

    writeResult(res, result, error, statusCode);
}

const postCollectUserData = async (req, res) => {
    const userId = req.user.userId;
    const { browser, os, device } = req.body;

    console.log("Device data:", browser, os, device);

    const { result, error, statusCode } = await insertUserData(userId, browser, os, device);

    writeResult(res, result, error, statusCode);
}

const getUser = async (req, res) => {
    const userId = req.params.id;

    const { result, error, statusCode } = await getUserData(userId);

    writeResult(res, result, error, statusCode);
}

const recommendBooks = async (req, res) => {
    const userId = req.user.userId;

    const { result, error, statusCode } = await getPreferences(userId);

    writeResult(res, result, error, statusCode);
}

const showLoggedInfo = async (req, res) => {
    const userId = req.user.userId;

    const { result, error, statusCode } = await getUserLoggedInfo(userId);

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
    postFavorite,
    getFavoriteBooks,
    postUserGenrePreferences,
    postUserAuthorPreferences,
    deleteWishToRead,
    deleteFavorite,
    deleteReadBook,
    deleteCurrentlyReading,
    postCollectUserData,
    getUser,
    recommendBooks,
    showLoggedInfo
};
