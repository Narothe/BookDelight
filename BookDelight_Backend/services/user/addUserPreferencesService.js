const {addGenrePreferences, addAuthorPreferences} = require("../../models/user/addUserPreferencesModel");
const {getSpecificGenres, getSpecificAuthors, getGenreByIds, getAuthorByIds} = require("../../models/book/getBookPreferencesModel");


const insertUserGenrePreferences = async (userId, genre) => {
    try {
        if (genre === undefined) {
            return { error: 'Genre is required.', statusCode: 400 };
        }

        const findGenre = await getSpecificGenres(genre);
        if (findGenre.error) {
            return { error: 'An error occurred while finding the genre.', statusCode: 500 };
        }

        const genreId = findGenre[0].id_genre

        const findExistingGenre = await getGenreByIds(userId, genreId);
        if (findExistingGenre > 0) {
            return { error: 'Genre already exists.', statusCode: 400 };
        }

        const addGenre = await addGenrePreferences(userId, genreId);

        if (addGenre.error) {
            return { error: 'An error occurred while adding the genre.', statusCode: 500 };
        }

        return { result: { message: 'Genre added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding genre:", err);
        return { error: 'An error occurred while adding the genre.', statusCode: 500 };
    }
};

const insertUserAuthorPreferences = async (userId, author) => {
    try {
        if (author === undefined) {
            return { error: 'Author is required.', statusCode: 400 };
        }

        const findAuthor = await getSpecificAuthors(author);
        if (findAuthor.error) {
            return { error: 'An error occurred while finding the author.', statusCode: 500 };
        }

        const authorId = findAuthor[0].id_author

        const findExistingAuthor = await getAuthorByIds(userId, authorId);
        if (findExistingAuthor > 0) {
            return { error: 'Author already exists.', statusCode: 400 };
        }

        const addAuthor = await addAuthorPreferences(userId, authorId);

        if (addAuthor.error) {
            return { error: 'An error occurred while adding the author.', statusCode: 500 };
        }

        return { result: { message: 'Author added successfully.', userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding author:", err);
        return { error: 'An error occurred while adding the author.', statusCode: 500 };
    }
};

module.exports = {
    insertUserGenrePreferences,
    insertUserAuthorPreferences
};
