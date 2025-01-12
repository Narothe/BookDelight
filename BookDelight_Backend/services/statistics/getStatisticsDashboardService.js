const {getCountStatsForUsers} = require("../../models/statistics/getCountStatsForUsersModel");

const showStatisticsDashboard = async() => {
    try {
        const result = await getCountStatsForUsers();

        if (result.length === 0) {
            return { error: 'Count stats not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the count stats:', err);
        return { error: 'An error occurred while getting the count stats.', statusCode: 500 };
    }
}

module.exports = { showStatisticsDashboard };
