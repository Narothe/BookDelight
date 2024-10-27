const {getUserPhotoById} = require("../../models/user/getUserPhotoModel");

const getPhoto = async (userId) => {

    try {
        const result = await getUserPhotoById(userId);

        if (!result) {
            return {error: 'Photo not found', statusCode: 404};
        }

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the user photo:', err);
        return { error: 'An error occurred while getting the user photo.', statusCode: 500 };
    }
}

module.exports = { getPhoto };
