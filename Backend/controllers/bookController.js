const { addBook, addAuthor, addDescription } = require('../models/bookModel');

const insertBook = async (req, res) => {
    const {
        title,
        publisher,
        publication_date,
        isbn,
        book_length,
        photo_path,
        authors,
        short_description,
        long_description
    } = req.body;
    const userId = req.user.userId;

    if (!title || !authors, !short_description, !long_description) {
        return res.status(400).json({ error: 'Title, authors, both descriptions are required.' });
    }

    try {
        const result = await addBook(
            userId,
            title,
            publisher,
            publication_date,
            isbn,
            book_length,
            photo_path
        );

        await addAuthor(authors, result.id_book);
        await addDescription(result.id_book, short_description, long_description);

        res.status(201).json({ message: 'Book added successfully.', bookId: result.id_book, userId: userId });
    } catch (err) {
        console.error("Error while adding the book:", err);
        res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
};

module.exports = { insertBook };
