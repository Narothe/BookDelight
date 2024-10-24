const { findBook } = require("../../services/book/getBookService");
const { findBooks } = require("../../services/book/getAllBooksService");
const { findPhoto } = require("../../services/book/getBookPhotoService");
const {insertBook} = require("../../services/book/postBookService");


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

const postBook = async (req, res) => {
    const userId = req.user.userId;

    const content = {
        title,
        publisher,
        publication_date,
        isbn,
        book_length,
        authors,
        short_description,
        long_description,
        genres
    } = req.body;

    const { result, error, statusCode } = await insertBook(userId, content);

    writeResult(res, result, error, statusCode);
}

module.exports = { getBook, getBooks, getPhoto, postBook };
