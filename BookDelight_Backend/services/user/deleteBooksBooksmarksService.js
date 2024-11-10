const {deleteWishToRead} = require("../../models/user/deleteWishToReadModel");
const {checkExistenceOfBook, checkWishToRead, checkFavoriteBooks, checkReadBooks, checkCurrentlyReading} = require("../../models/user/checkVariousUserBookmarks");
const {deleteFavorite} = require("../../models/user/deleteFavoriteBookModel");
const {deleteReadBook} = require("../../models/user/deleteReadBookModel");
const {deleteCurrentlyReading} = require("../../models/user/deleteCurrentlyReadingModel");


const removeWishToRead = async (bookId, userId) => {
    try {
        if (bookId === undefined) {
            return { error: 'Book ID is required.', statusCode: 400 };
        }

        const findBook = await checkExistenceOfBook(bookId);

        if (findBook.error) {
            return { error: 'An error occurred while finding the book.', statusCode: 500 };
        }

        const checkWishToReadBook = await checkWishToRead(userId, bookId);
        if (checkWishToReadBook.error) {
            return { error: 'An error occurred while checking if the book is in wish to read.', statusCode: 500 };
        }

        const deleteBook = await deleteWishToRead(userId, bookId);
        if (deleteBook.error) {
            return { error: 'An error occurred while removing the book from wish to read.', statusCode: 500 };
        }

        return { result: { message: 'Book removed successfully from wish to read.', userId: userId }, statusCode: 200 };
    } catch (err) {
        console.error("Error while removing book from wish to read:", err);
        return { error: 'An error occurred while removing the book from wish to read.', statusCode: 500 };
    }
}

const removeFavorite = async (bookId, userId) => {
    try {
        if (bookId === undefined) {
            return { error: 'Book ID is required.', statusCode: 400 };
        }

        const findBook = await checkExistenceOfBook(bookId);

        if (findBook.error) {
            return { error: 'An error occurred while finding the book.', statusCode: 500 };
        }

        const checkFavoriteBook = await checkFavoriteBooks(userId, bookId);
        if (checkFavoriteBook.error) {
            return { error: 'An error occurred while checking if the book is in favorite.', statusCode: 500 };
        }

        const deleteBook = await deleteFavorite(userId, bookId);
        if (deleteBook.error) {
            return { error: 'An error occurred while removing the book from favorite.', statusCode: 500 };
        }

        return { result: { message: 'Book removed successfully from favorite.', userId: userId }, statusCode: 200 };
    } catch (err) {
        console.error("Error while removing book from favorite:", err);
        return { error: 'An error occurred while removing the book from favorite.', statusCode: 500 };
    }
}

const removeReadBook = async (bookId, userId) => {
    try {
        if (bookId === undefined) {
            return { error: 'Book ID is required.', statusCode: 400 };
        }

        const findBook = await checkExistenceOfBook(bookId);

        if (findBook.error) {
            return { error: 'An error occurred while finding the book.', statusCode: 500 };
        }

        const checkReadBook = await checkReadBooks(userId, bookId);
        if (checkReadBook.error) {
            return { error: 'An error occurred while checking if the book is in read book.', statusCode: 500 };
        }

        const deleteBook = await deleteReadBook(userId, bookId);
        if (deleteBook.error) {
            return { error: 'An error occurred while removing the book from read book.', statusCode: 500 };
        }

        return { result: { message: 'Book removed successfully from read book.', userId: userId }, statusCode: 200 };
    } catch (err) {
        console.error("Error while removing book from read book:", err);
        return { error: 'An error occurred while removing the book from read book.', statusCode: 500 };
    }
}

const removeCurrentlyReading = async (bookId, userId) => {
    try {
        if (bookId === undefined) {
            return { error: 'Book ID is required.', statusCode: 400 };
        }

        const findBook = await checkExistenceOfBook(bookId);

        if (findBook.error) {
            return { error: 'An error occurred while finding the book.', statusCode: 500 };
        }

        const checkCurrentlyReadingBook = await checkCurrentlyReading(userId, bookId);
        if (checkCurrentlyReadingBook.error) {
            return { error: 'An error occurred while checking if the book is in currently reading.', statusCode: 500 };
        }

        const deleteBook = await deleteCurrentlyReading(userId, bookId);
        if (deleteBook.error) {
            return { error: 'An error occurred while removing the book from currently reading.', statusCode: 500 };
        }

        return { result: { message: 'Book removed successfully from currently reading.', userId: userId }, statusCode: 200 };
    } catch (err) {
        console.error("Error while removing book from currently reading:", err);
        return { error: 'An error occurred while removing the book from currently reading.', statusCode: 500 };
    }
}

module.exports = {
    removeWishToRead,
    removeFavorite,
    removeReadBook,
    removeCurrentlyReading
};
