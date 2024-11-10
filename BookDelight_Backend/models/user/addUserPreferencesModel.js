const pool = require("../../config/db");

const addGenrePreferences = async (userId, genreId) => {
    const query = `
        INSERT INTO bookdelight.User_Genres (id_user, id_genre)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [userId, genreId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while insert genre:', err);
        return { error: 'An error occurred during insert a genre.' };
    }
}

const addAuthorPreferences = async (userId, authorId) => {
    const query = `
        INSERT INTO bookdelight.User_Authors (id_user, id_author)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [userId, authorId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while insert author:', err);
        return { error: 'An error occurred during insert an author.' };
    }
}

module.exports = {
    addGenrePreferences,
    addAuthorPreferences
};
