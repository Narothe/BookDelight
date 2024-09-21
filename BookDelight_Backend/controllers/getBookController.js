const { getBookById } = require("../models/getBookModel");

const getBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const result = await getBookById(bookId);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Error while getting the book:', err);
        res.status(500).json({ error: 'An error occurred while getting the book.' });
    }
}

module.exports = { getBook };
