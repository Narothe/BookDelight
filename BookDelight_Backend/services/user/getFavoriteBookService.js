const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {getFavoriteBook} = require("../../models/user/getFavoriteBooksModel");


const showFavorite = async (userId) => {

    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        const result = await getFavoriteBook(userId);

        if (result.length === 0) {
            return {error: 'Favorite books not found', statusCode: 404};
        }

        result.forEach(book => {
            book.type = 'Favorite';
        });

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the favorite books:', err);
        return { error: 'An error occurred while getting the favorite books.', statusCode: 500 };
    }
}

module.exports = {
    showFavorite
};
