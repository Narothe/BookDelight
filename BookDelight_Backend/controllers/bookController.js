const {writeResult} = require("../utils/writeResult");

const { findBook } = require("../services/book/getBookService");
const { findBooks } = require("../services/book/getAllBooksService");
const { findPhoto } = require("../services/book/getBookPhotoService");
const { insertBook } = require("../services/book/postBookService");
const { findBookAuthors, findBookGenres, findSpecificBookGenres, findSpecificBookAuthor} = require("../services/book/getBookPreferencesService");
const {searchBooks} = require("../services/book/postSeachBookService");


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

const getAllBookAuthors = async (req, res) => {

    const { result, error, statusCode } = await findBookAuthors();

    writeResult(res, result, error, statusCode);
}

const getAllBookGenres = async (req, res) => {

    const { result, error, statusCode } = await findBookGenres();

    writeResult(res, result, error, statusCode);
}

const searchBookGenre = async (req, res) => {
    const { genre } = req.body;

    const { result, error, statusCode } = await findSpecificBookGenres(genre);

    writeResult(res, result, error, statusCode);
}

const searchBookAuthor = async (req, res) => {
    const { author } = req.body;

    const { result, error, statusCode } = await findSpecificBookAuthor(author);

    writeResult(res, result, error, statusCode);
}

const searchBook = async (req, res) => {
    const content = {
        payload,
        minLength,
        maxLength,
        minRating,
        maxRating
    } = req.body;

    const { result, error, statusCode } = await searchBooks(content);

    writeResult(res, result, error, statusCode);
}

module.exports = {
    getBook,
    getBooks,
    getPhoto,
    postBook,
    getAllBookAuthors,
    getAllBookGenres,
    searchBookGenre,
    searchBookAuthor,
    searchBook
};
