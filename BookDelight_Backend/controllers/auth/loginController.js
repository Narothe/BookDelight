// const {loginUser} = require('../models/loginModel.js');
// const jwt = require('jsonwebtoken');
// const client = require('../config/db');
// require('dotenv').config();

// const login = async (req, res) => {
//     const { identity, password } = req.body;
//
//     if (!identity || !password) {
//         return res.status(400).json({ error: 'Email or username and password are required.' });
//     }
//
//     try {
//         const result = await loginUser(identity, password);
//
//         if (result.error) {
//             return res.status(401).json({error: 'Invalid password or email or username.', message: result.error});
//         }
//
//         console.log('User logged - userId:', result.userId);
//         const token = jwt.sign({userId: result.userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRATION});
//
//         await client.query(
//             'INSERT INTO bookdelight.Sessions (id_user, jwt_token, expires_at) VALUES ($1, $2, $3)',
//             [result.userId, token, new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)]
//         );
//
//         res.status(200).json({
//             message: result.message,
//             token,
//             user: {
//                 userId: result.userId,
//                 email: result.email,
//                 username: result.username,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//                 birthDay: result.birthDay,
//                 birthMonth: result.birthMonth,
//                 birthYear: result.birthYear
//             }
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'An error occurred during logging in the user.' });
//     }
// };
//
// module.exports = { login };

const {loginUser} = require("../../models/auth/loginModel");
const jwt = require('jsonwebtoken');
const {createSession} = require("../../models/auth/sessionControlModel");
require('dotenv').config();


const login = async (req, res) => {
    const { identity, password } = req.body;

    if (!identity || !password) {
        return res.status(400).json({ error: 'Email or username and password are required.' });
    }

    try {
        const result = await loginUser(identity, password);

        if (result.error) {
            return res.status(401).json({ error: 'Invalid password or email or username.', message: result.error });
        }

        const userId = result.id_user;
        console.log('User logged - userId:', userId);

        const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });

        const session = await createSession(userId, token, new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

        if (session.error) {
            return res.status(500).json({ error: 'An error occurred during adding the session.' });
        }

        res.status(200).json({
            message: result.message,
            token,
            user: {
                userId: result.id_user,
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
}

module.exports = { login };
