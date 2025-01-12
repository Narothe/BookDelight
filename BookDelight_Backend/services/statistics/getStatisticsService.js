const {getCreatedUsersStats} = require("../../models/statistics/getCreatedUsersStatsModel");
const {getCreatedBooksStats} = require("../../models/statistics/getCreatedBooksStatsModel");
const {getCreatedReviewsStats} = require("../../models/statistics/getCreatedReviewsStatsModel");
const {getCreatedRepliesStats} = require("../../models/statistics/getCreatedRepliesStatsModel");
const {getAddToCurrentlyStatsModel} = require("../../models/statistics/getAddToCurrentlyStatsModel");
const {getWishToReadBooksStats} = require("../../models/statistics/getAddToWishToReadStatsModel");
const {getReadBooksStats} = require("../../models/statistics/getAddToReadStatsModel");
const {getFavoriteBooksStats} = require("../../models/statistics/getAddFavoriteStatsModel");

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
        const createdWishToReadStats = await getWishToReadBooksStats(dateRange);
        const createdReadBooksStats = await getReadBooksStats(dateRange);
        const createdFavoritesStats = await getFavoriteBooksStats(dateRange);

        return {
            result: {
                results: {
                    created_books: createdBooksStats[0].created_books,
                    created_users: createdUsersStats[0].created_users,
                    created_reviews: createdReviewsStats[0].created_reviews,
                    created_replies: createdRepliesStats[0].created_replies,
                    added_to_currently: createdCurrentlyStats[0].added_to_currently,
                    added_to_wish_to_read: createdWishToReadStats[0].added_to_wish_to_read,
                    added_to_read_books: createdReadBooksStats[0].added_to_read_books,
                    added_to_favorites: createdFavoritesStats[0].added_to_favorites
                },
            },
            statusCode: 200,
        };    } catch (error) {
        console.error("Error while getting statistics:", error);
        return {error: 'An error occurred while getting the statistics.', statusCode: 500};
    }
}

module.exports = { showStatsWithRange };
