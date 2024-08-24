const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');

const register = async (req, res) => {
    const { email, password, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date } = req.body;

    if (!email || !password || !username || !firstName || !lastName || !birthDay || !birthMonth || !birthYear) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(email, hashedPassword, username, firstName, lastName, birthDay, birthMonth, birthYear, creation_date);
        res.status(201).json({ message: 'User registered successfully!', userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};

module.exports = { register };
