const {search} = require("../../models/book/searchBooksModel");
const searchBooks = async (content) => {
    const {
        payload,
        minLength,
        maxLength,
        minRating,
        maxRating
    } = content;

    console.log(content);

    if (!payload) {
        return { error: 'Please provide a search term.', statusCode: 400 };
    }

    try {
        const result = await search(
            payload,
            minLength,
            maxLength,
            minRating,
            maxRating
        );

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error("Error while searching:", err);
        return { error: 'An error occurred while searching.', statusCode: 500 };
    }
};

module.exports = { searchBooks };
