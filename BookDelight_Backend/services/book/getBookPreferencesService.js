const {getAuthors, getGenres, getSpecificGenres, getSpecificAuthors} = require("../../models/book/getBookPreferencesModel");

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

const findSpecificBookGenres = async(genre) => {
    try {
        const result = await getSpecificGenres(genre);

        if (result.length === 0) {
            return { error: 'Genre not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the genre:', err);
        return { error: 'An error occurred while getting the genre.', statusCode: 500 };
    }
}

const findSpecificBookAuthor = async(author) => {
    try {
        const result = await getSpecificAuthors(author);

        if (result.length === 0) {
            return { error: 'Author not found', statusCode: 404 };
        }

        return { result: result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the author:', err);
        return { error: 'An error occurred while getting the author.', statusCode: 500 };
    }
}

module.exports = {
    findBookAuthors,
    findBookGenres,
    findSpecificBookGenres,
    findSpecificBookAuthor
};
