const { addReply, userReply} = require('../../models/reply/addReplyModel');
const { getBookById } = require("../../models/book/getBookModel");

const insertReply = async (content, userId, id_book, id_review) => {
    const { description } = content;

    if (!description) {
        return { error: 'Missing required fields', statusCode: 400 };
    }

    try {
        // const reviewed = await userReply(userId, id_book, id_review);
        //
        // if (reviewed) {
        //     return { error: 'User has already reply to this book', statusCode: 400 };
        // }

        const book = await getBookById(id_book);

        if (!book) {
            return { error: 'Book not found', statusCode: 404 };
        }

        const review = await addReply(id_review, userId, id_book, description);
        return { result: { message: 'Reply added successfully', review }, statusCode: 201 };
    } catch (err) {
        console.error('Error while adding the reply:', err);
        return { error: 'An error occurred while adding the reply', statusCode: 500 };
    }
};

module.exports = { insertReply };
