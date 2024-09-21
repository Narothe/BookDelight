const { addBook } = require('../models/addBookModel');
const { addAuthor } = require('../models/addAuthorModel');
const { addDescription } = require('../models/addDescriptionModel');
const { addGenre } = require('../models/genreModel');

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
        long_description,
        genres
    } = req.body;
    const userId = req.user.userId;

    if (!title || !authors, !short_description, !long_description, !genres) {
        return res.status(400).json({ error: 'Title, authors, both descriptions, genres are required.' });
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
        await addGenre(genres, result.id_book);

        res.status(201).json({ message: 'Book added successfully.', bookId: result.id_book, userId: userId });
    } catch (err) {
        console.error("Error while adding the book:", err);
        res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
};

module.exports = { insertBook };
