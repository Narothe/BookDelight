const {checkExistenceOfBook, checkFavoriteBooks} = require("../../models/user/checkVariousUserBookmarks");

const {addFavorite} = require("../../models/user/addFavoriteBookModel");


const insertFavorite = async (bookId, userId) => {

    try {
        const checkBook = await checkExistenceOfBook(bookId);
        if (!checkBook) {
            return { error: 'Book not found.', statusCode: 404 };
        }

        const checkExistenceOfFavoriteBook = await checkFavoriteBooks(userId, bookId);
        if (checkExistenceOfFavoriteBook) {
            return { error: 'Book already exists in favorite.', statusCode: 400 };
        }

        await addFavorite(userId, bookId);
        return { result: { message: 'Favorite book added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding favorite book:", err);
        return { error: 'An error occurred while adding the favorite book.', statusCode: 500 };
    }
};

module.exports = {
    insertFavorite
};
