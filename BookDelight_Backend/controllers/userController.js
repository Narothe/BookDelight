const {writeResult} = require("../utils/writeResult");
const {insertCurrentlyReading} = require("../services/user/addCurrentlyReadingService");
const {insertCurrentlyReadingPage} = require("../services/user/addCurrentlyReadingPageService");
const {showCurrentlyReading} = require("../services/user/getCurrentlyReadingService");
const {getPhoto} = require("../services/user/getUserPhotoService");


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


module.exports = { postCurrentlyReading, postCurrentlyReadingPage, getCurrentlyReading, getUserPhoto };
