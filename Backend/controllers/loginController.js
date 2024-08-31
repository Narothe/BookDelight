const {loginUser} = require('../models/loginModel.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const result = await loginUser(email, password);

        if (result.error) {
            return res.status(401).json({error: 'Invalid password or email.', message: result.error});
        }

        const token = jwt.sign({userId: result.userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRATION});

        res.status(200).json({
            message: result.message,
            token,
            user: {
                userId: result.userId,
                email: result.email,
                username: result.username,
                firstName: result.firstName,
                lastName: result.lastName,
                birthDay: result.birthDay,
                birthMonth: result.birthMonth,
                birthYear: result.birthYear
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during logging in the user.' });
    }
};

module.exports = { login };
