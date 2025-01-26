const {getUniqueLoggedUsers} = require("../../models/statistics/getSingleLoggedUsersModel");

const getUserLoggedInfo = async(userId) => {
    try {
        const result = await getUniqueLoggedUsers(userId);

        if (result.error) {
            return {error: result.error, statusCode: 500};
        }

        return { result, statusCode: 200 };

    } catch (err) {
        console.error('Error while getting the count stats:', err);
        return {error: 'An error occurred while getting the count stats.', statusCode: 500};
    }
}

module.exports = { getUserLoggedInfo };
