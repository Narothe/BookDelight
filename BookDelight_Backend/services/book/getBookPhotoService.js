const { getPhotosByBookId } = require("../../models/book/getBookPhotoModel");
const {rows} = require("pg/lib/defaults");

const findPhoto = async (bookId) => {
    try {
        const result = await getPhotosByBookId(bookId);

        if (!result) {
            return { error: 'Photo not found', statusCode: 404 };
        }

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the photo:', err);
        return { error: 'An error occurred while getting the photo.', statusCode: 500 };
    }
}

module.exports = { findPhoto };
