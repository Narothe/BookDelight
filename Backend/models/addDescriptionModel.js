const book = require("../config/db");

const addDescription = async (bookId, shortDesc, longDesc) => {
    const query = `
        INSERT INTO bookdelight.Book_Description (id_book, short_description, long_description)
        VALUES ($1, $2, $3);`;

    const values = [bookId, shortDesc, longDesc];

    try {
        await book.query(query, values);
    } catch (err) {
        console.error('Error while adding the description:', err);
        return { error: 'An error occurred during adding the description.' };
    }
};

module.exports = { addDescription };
