const { addBook } = require('../models/bookModel');

const createBook = async (req, res) => {
    const { title, publisher, publication_date, isbn, book_length, photo_path } = req.body;
    const userId = req.user.userId;

    if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
    }

    try {
        const result = await addBook(userId, title, publisher, publication_date, isbn, book_length, photo_path);
        res.status(201).json({ message: 'Book added successfully.', bookId: result.id_book, userId: userId });
    } catch (err) {
        console.error("Error while adding the book:", err);
        res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
};

module.exports = { createBook };
