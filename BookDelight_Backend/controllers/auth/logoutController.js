const client = require("../../config/db");
const logout = async (req, res) => {

    try {
        await client.query('UPDATE bookdelight.Sessions SET expires_at = $1 WHERE jwt_token = $2',
            [new Date(Date.now()), req.header('Authorization').replace('Bearer ', '')]);

        res.status(200).json({ message: 'User logged out successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during logging out the user.' });
    }
}

module.exports = { logout };
