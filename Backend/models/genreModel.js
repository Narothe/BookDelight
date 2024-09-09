const book = require('../config/db');

const acceptedGenres = ['novels', 'scifi', 'fantasy', 'crime_stories', 'thrillers', 'romantic', 'historical', 'biographies', 'non_fiction', 'comics', 'classics_of_literature'];

const validGenres = (genres) => {
    const uniqueGenres = [...new Set(genres)];
    if (uniqueGenres.length !== genres.length) {
        throw new Error('Duplicate genres are not allowed.');
    }

    for (let genre of genres) {
        if (!acceptedGenres.includes(genre)) {
            throw new Error(`Invalid genre: "${genre}"`);
        }
    }
}

const addGenre = async (genres, bookId) => {
    validGenres(genres);

    // check if genre exists
    for (let genre of genres) {
        let result = await book.query('' +
            'SELECT id_genre FROM bookdelight.Genre WHERE genre_name = $1',
            [genre]
        );

        let genreId;

        // if genre does not exist, add it (save in two tables)
        try {
            if (result.rows.length === 0) {
                const insert = await book.query(
                    'INSERT INTO bookdelight.Genre (genre_name) VALUES ($1) RETURNING id_genre',
                    [genre]
                );

                genreId = insert.rows[0].id_genre;
            } else {
                genreId = result.rows[0].id_genre;
            }

            await book.query(
                'INSERT INTO bookdelight.Book_Genre (id_book, id_genre) VALUES ($1, $2)',
                [bookId, genreId]
            );

        } catch (err) {
            console.error('Error while adding the genre:', err);
            return { error: 'An error occurred during adding the genre.' };
        }
    }
}

module.exports = { addGenre };
