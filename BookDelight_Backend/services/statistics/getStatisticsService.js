const {getCreatedUsersStats} = require("../../models/statistics/getCreatedUsersStatsModel");
const {getCreatedBooksStats} = require("../../models/statistics/getCreatedBooksStatsModel");

const showStatsWithRange = async (dateRange) => {

    if (!dateRange) {
        return {error: 'Missing required fields', statusCode: 400};
    }

    try {
        const createdBooksStats = await getCreatedBooksStats(dateRange);
        const createdUsersStats = await getCreatedUsersStats(dateRange);

        if (!createdBooksStats[0]?.created_books) {
            return { error: "No book statistics found", statusCode: 404 };
        }

        if (!createdUsersStats[0]?.created_users) {
            return { error: "No user statistics found", statusCode: 404 };
        }

        return {
            result: {
                results: {
                    created_books: createdBooksStats[0].created_books,
                    created_users: createdUsersStats[0].created_users,
                },
            },
            statusCode: 200,
        };    } catch (error) {
        console.error("Error while getting statistics:", error);
        return {error: 'An error occurred while getting the statistics.', statusCode: 500};
    }
}

module.exports = { showStatsWithRange };
