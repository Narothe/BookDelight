const { addBook } = require('../../models/book/addBookModel');
const { addAuthor } = require('../../models/book/addAuthorModel');
const { addDescription } = require('../../models/book/addDescriptionModel');
const { addGenre } = require('../../models/book/addGenreModel');

const validateIsbn = (isbn) => {
    const isbnStr = isbn.toString();
    const isValid = /^\d{10}$|^\d{13}$/.test(isbnStr);

    if (!isValid) {
        return { isValid: false, message: 'ISBN must be a 10-digit or 13-digit number.' };
    }

    return { isValid: true };
};

const insertBook = async (userId, content) => {
    const {
        title,
        authors,
        short_description,
        long_description,
        genres,
        publisher,
        publication_date,
        isbn,
        book_length
    } = content;

    // console.log(content);

    if (!title || !authors || !short_description || !long_description || !genres) {
        return { error: 'Title, authors, both descriptions, genres are required.', statusCode: 400 };
    }

    const isbnValidation = validateIsbn(isbn);
    if (!isbnValidation.isValid) {
        return { error: isbnValidation.message, statusCode: 400 };
    }

    try {
        const result = await addBook(
            userId,
            title,
            publisher,
            publication_date,
            isbn,
            book_length
        );

        await addAuthor(authors, result.id_book);
        await addDescription(result.id_book, short_description, long_description);
        await addGenre(genres, result.id_book);

        return { result: { message: 'Book added successfully.', bookId: result.id_book, userId: userId }, statusCode: 201 };
    } catch (err) {
        console.error("Error while adding the book:", err);
        return { error: 'An error occurred while adding the book.', statusCode: 500 };
    }
};

module.exports = { insertBook };
