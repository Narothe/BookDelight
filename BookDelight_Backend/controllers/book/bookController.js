const { findBook } = require("../../service/book/getBookService");
const { findBooks } = require("../../service/book/getAllBooksService");
const { findPhoto } = require("../../service/book/getBookPhotoService");


const writeResult = (res, result, error, statusCode) => {
    if (error) {
        return res.status(statusCode).json({ message: error });
    }

    res.status(statusCode).json(result);
}


const getBook = async (req, res) => {
    const bookId = req.params.id;

    const { result, error, statusCode } = await findBook(bookId);

    writeResult(res, result, error, statusCode);
};

const getBooks = async (req, res) => {
    const { result, error, statusCode } = await findBooks();

    writeResult(res, result, error, statusCode);

}

const getPhoto = async (req, res) => {
    const bookId = req.params.id;

    const { result, error, statusCode } = await findPhoto(bookId);

    writeResult(res, result, error, statusCode);
}

module.exports = { getBook, getBooks, getPhoto };
