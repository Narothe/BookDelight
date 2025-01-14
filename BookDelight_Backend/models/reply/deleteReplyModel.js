const view = require('../../config/db');

const deleteReply = async (replyId) => {
    const query = `
        UPDATE bookdelight.reply
        SET description = '[comment removed by admin]'
        WHERE id_reply = $1
            RETURNING *;
    `;

    const values = [replyId];

    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while deleting the reply:', err);
        return { error: 'An error occurred during deleting the reply.' };
    }
};

module.exports = { deleteReply };
