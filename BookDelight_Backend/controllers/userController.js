const {writeResult} = require("../utils/writeResult");
const {insertCurrentlyReading} = require("../services/user/addCurrentlyReadingService");
const {insertCurrentlyReadingPage} = require("../services/user/addCurrentlyReadingPageService");


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





module.exports = { postCurrentlyReading, postCurrentlyReadingPage };
