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

module.exports = {
    getAuthors,
    getGenres
};
