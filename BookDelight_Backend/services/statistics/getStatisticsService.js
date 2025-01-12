const {getCreatedUsersStats} = require("../../models/statistics/getCreatedUsersStatsModel");
const {getCreatedBooksStats} = require("../../models/statistics/getCreatedBooksStatsModel");
const {getCreatedReviewsStats} = require("../../models/statistics/getCreatedReviewsStatsModel");
const {getCreatedRepliesStats} = require("../../models/statistics/getCreatedRepliesStatsModel");
const {getAddToCurrentlyStatsModel} = require("../../models/statistics/getAddToCurrentlyStatsModel");

const showStatsWithRange = async (dateRange) => {

    if (!dateRange) {
        return {error: 'Missing required fields', statusCode: 400};
    }

    try {
        const createdBooksStats = await getCreatedBooksStats(dateRange);
        const createdUsersStats = await getCreatedUsersStats(dateRange);
        const createdReviewsStats = await getCreatedReviewsStats(dateRange);
        const createdRepliesStats = await getCreatedRepliesStats(dateRange);
        const createdCurrentlyStats = await getAddToCurrentlyStatsModel(dateRange);

        if (!createdBooksStats[0]?.created_books) {
            return { error: "No book statistics found", statusCode: 404 };
        }

        if (!createdUsersStats[0]?.created_users) {
            return { error: "No user statistics found", statusCode: 404 };
        }

        if (!createdReviewsStats[0]?.created_reviews) {
            return { error: "No review statistics found", statusCode: 404 };
        }

        if (!createdRepliesStats[0]?.created_replies) {
            return { error: "No reply statistics found", statusCode: 404 };
        }

        if (!createdCurrentlyStats[0]?.added_to_currently) {
            return { error: "No add to currently statistics found", statusCode: 404 };
        }

        return {
            result: {
                results: {
                    created_books: createdBooksStats[0].created_books,
                    created_users: createdUsersStats[0].created_users,
                    created_reviews: createdReviewsStats[0].created_reviews,
                    created_replies: createdRepliesStats[0].created_replies,
                    added_to_currently: createdCurrentlyStats[0].added_to_currently
                },
            },
            statusCode: 200,
        };    } catch (error) {
        console.error("Error while getting statistics:", error);
        return {error: 'An error occurred while getting the statistics.', statusCode: 500};
    }
}

module.exports = { showStatsWithRange };
