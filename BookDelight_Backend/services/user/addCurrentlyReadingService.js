const {addCurrentlyReading} = require("../../models/user/addCurrentlyReadingModel");
const {checkExistenceOfBook, checkCurrentlyReading, checkWishToRead, checkReadBooks} = require("../../models/user/checkVariousUserBookmarks");
const {deleteWishToRead} = require("../../models/user/deleteWishToReadModel");
const {deleteReadBook} = require("../../models/user/deleteReadBookModel");
const {deleteFavorite} = require("../../models/user/deleteFavoriteBookModel");

const insertCurrentlyReading = async (id_book, userId) => {

    try {
        const checkBook = await checkExistenceOfBook(id_book);
        if (!checkBook) {
            return { error: 'Book not found.', statusCode: 404 };
        }

        const checkExistenceOfCurrentlyReadingBook = await checkCurrentlyReading(userId, id_book);
        if (checkExistenceOfCurrentlyReadingBook) {
            return { result: null, error: 'Currently reading book already exists.', statusCode: 400 };
        }

        const checkExistenceOfWishToReadBook = await checkWishToRead(userId, id_book);
        if (checkExistenceOfWishToReadBook) {
            await deleteWishToRead(userId, id_book);
            if (deleteWishToRead) {
                await addCurrentlyReading( userId, id_book);
                return {result: {message: 'Book deleted from wish to read successfully and added to currently reading successfully', userId: userId}, statusCode: 201};
            }
        }

        const checkExistenceOfReadBook = await checkReadBooks(userId, id_book);
        if (checkExistenceOfReadBook) {
            await deleteReadBook(userId, id_book);
            if (deleteReadBook) {
                await addCurrentlyReading( userId, id_book);
                return {result: {message: 'Book deleted from read books successfully and added to currently reading successfully', userId: userId}, statusCode: 201};
            }
        }

        const checkExistenceOfFavorite = await checkReadBooks(userId, id_book);
        if (checkExistenceOfFavorite) {
            await deleteFavorite(userId, id_book);
            if (deleteFavorite) {
                await addCurrentlyReading( userId, id_book);
                return {result: {message: 'Book deleted from favorite successfully and added to currently reading successfully', userId: userId}, statusCode: 201};
            }
        }

        await addCurrentlyReading( userId, id_book);
        return { result: { message: 'Currently reading added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the currently reading:", err);
        return { result: null, error: 'An error occurred while adding the currently reading.', statusCode: 500 };
    }
};

module.exports = {
    insertCurrentlyReading
};
