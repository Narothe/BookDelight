const { getAllBooks } = require("../models/getAllBooksModel");

const getBooks = async (req, res) => {

    try {
        const result = await getAllBooks();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Books not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Error while getting the books:', err);
        res.status(500).json({ error: 'An error occurred while getting the books.' });
    }
}

module.exports = { getBooks };
