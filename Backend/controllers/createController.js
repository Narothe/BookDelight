const client = require('../config/db');
const bcrypt = require('bcrypt');
const { createUser } = require('../models/createModel');

const register = async (req, res) => {
    const { email, password, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date } = req.body;

    if (!email || !password || !username || !firstName || !lastName || !birthDay || !birthMonth || !birthYear) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        await client.query('BEGIN');

        const emailCheck = await client.query('SELECT id_user FROM bookdelight.Users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({error: 'That email already exists.'});
        }

        const usernameCheck = await client.query('SELECT id_user FROM bookdelight.Users WHERE username = $1', [username]);
        if (usernameCheck.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({error: 'That username already exists.'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(email, hashedPassword, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date);

        await client.query('COMMIT');
        res.status(201).json({ message: 'User registered successfully.', userId });
    } catch (err) {
        console.error(err);
        await client.query('ROLLBACK');
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};

module.exports = { register };
