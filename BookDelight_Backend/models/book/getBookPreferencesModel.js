const pool = require("../../config/db");

const getGenres = async () => {
    const query = `
        SELECT g.genre_name 
        FROM bookdelight.genre g;
    `;

    try {
        const result = await pool.query(query);
        // return result.rows;
        return result.rows.map(row => row.genre_name)
    } catch (err) {
        console.error('Error while getting the genres:', err);
        return { error: 'An error occurred during getting the genres.' };
    }
}

const getAuthors = async () => {
    const query = `
        SELECT a.author_name 
        FROM bookdelight.author a;
    `;

    try {
        const result = await pool.query(query);
        // return result.rows;
        return result.rows.map(row => row.author_name)
    } catch (err) {
        console.error('Error while getting the authors:', err);
        return { error: 'An error occurred during getting the authors.' };
    }
}

const getSpecificGenres = async (genre) => {
    const query = `
        select * from bookdelight.genre
        where genre_name ILIKE $1;
    `;

    try {
        const result = await pool.query(query, [genre]);

        // console.log(result.rows[0].id_genre);

        return result.rows;
    } catch (err) {
        console.error('Error while getting the genre:', err);
        return { error: 'An error occurred during getting the genre.' };
    }
}

const getSpecificAuthors = async (author) => {
    const query = `
        SELECT *
        FROM bookdelight.author
        WHERE
            (LEVENSHTEIN(author_name, $1) <= 3 OR author_name ILIKE '%' || $1 || '%')
          AND author_name ~* ('^[A-Za-z. ]*' || $1 || '[A-Za-z. ]*$');
    `;

    try {
        const result = await pool.query(query, [author]);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the author:', err);
        return { error: 'An error occurred during getting the author.' };
    }
}

const getGenreByIds = async (userId, genreId) => {
    const query = `
        SELECT * FROM bookdelight.User_Genres
        WHERE id_user = $1 AND id_genre = $2;
    `;

    try {
        const result = await pool.query(query, [userId, genreId]);

        return result.rows.length > 0;

    } catch (err) {
        console.error('Error while getting the genre by user:', err);
        return { error: 'An error occurred during getting the genre by user.' };
    }
}

const getAuthorByIds = async (userId, authorId) => {
    const query = `
        SELECT * FROM bookdelight.User_Authors
        WHERE id_user = $1 AND id_author = $2;
    `;

    try {
        const result = await pool.query(query, [userId, authorId]);

        return result.rows.length > 0;

    } catch (err) {
        console.error('Error while getting the author by user:', err);
        return { error: 'An error occurred during getting the author by user.' };
    }
}

module.exports = {
    getAuthors,
    getGenres,
    getSpecificGenres,
    getSpecificAuthors,
    getGenreByIds,
    getAuthorByIds
};
