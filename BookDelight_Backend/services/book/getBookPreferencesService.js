const {getAuthors, getGenres} = require("../../models/book/getBookPreferencesModel");

const findBookAuthors = async() => {
    try {
        const result = await getAuthors();

        if (result.length === 0) {
            return { error: 'Authors not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the authors:', err);
        return { error: 'An error occurred while getting the authors.', statusCode: 500 };
    }
}

const findBookGenres = async() => {
    try {
        const result = await getGenres();

        if (result.length === 0) {
            return { error: 'Genres not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the genres:', err);
        return { error: 'An error occurred while getting the genres.', statusCode: 500 };
    }
}

module.exports = {
    findBookAuthors,
    findBookGenres
};
