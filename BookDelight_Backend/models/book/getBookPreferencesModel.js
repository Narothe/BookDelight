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
        select genre_name from bookdelight.genre
        where genre_name ILIKE $1;
    `;

    try {
        const result = await pool.query(query, [genre]);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the genre:', err);
        return { error: 'An error occurred during getting the genre.' };
    }
}

const getSpecificAuthors = async (author) => {
    const query = `
        SELECT author_name
        FROM bookdelight.author
        WHERE
            (LEVENSHTEIN(author_name, $1) <= 3 OR author_name ILIKE '%' || $1 || '%')
          AND author_name ~* ('^[A-Za-z. ]*' || $1 || '[A-Za-z. ]*$');
    `;

    try {
        const result = await pool.query(query, [author]);
        // return result.rows;
        return result.rows.map(row => row.author_name)
    } catch (err) {
        console.error('Error while getting the author:', err);
        return { error: 'An error occurred during getting the author.' };
    }
}

module.exports = {
    getAuthors,
    getGenres,
    getSpecificGenres,
    getSpecificAuthors
};
