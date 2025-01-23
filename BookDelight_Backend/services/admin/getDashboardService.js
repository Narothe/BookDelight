const {getAdminCountStats} = require("../../models/statistics/getAdminStatsCountModel");
const {getAllLoggedUsers} = require("../../models/statistics/getAllLoggedUsersModel");

const adminDashboard = async(userId) => {
    try {
        const countResult = await getAdminCountStats(userId);

        if (countResult.length === 0) {
            return {error: 'Count stats not found', statusCode: 404};
        }

        const userSessions = await getAllLoggedUsers();

        return {
            result: {
                countResult,
                userSessions
            },
            statusCode: 200
        };
    } catch (err) {
        console.error('Error while getting the count stats:', err);
        return {error: 'An error occurred while getting the count stats.', statusCode: 500};
    }
}

module.exports = { adminDashboard };
