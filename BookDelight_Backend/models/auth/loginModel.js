// const client = require('../config/db');
// const bcrypt = require('bcrypt');
//
// const loginUser = async (identity, password) => {
//     try {
//         const searchUser = await client.query('SELECT * FROM bookdelight.Users WHERE email = $1 OR username = $1', [identity]);
//         if (searchUser.rows.length === 0) {
//             return {error: 'User not found.'};
//         }
//
//         const user = searchUser.rows[0];
//
//         const passwordMatch = await bcrypt.compare(password, user.password);
//
//         if (!passwordMatch) {
//             return {error: 'Invalid password.'};
//         }
//
//         return {
//             message: 'User logged in successfully.',
//             userId: user.id_user,
//             email: user.email,
//             username: user.username,
//             firstName: user.first_name,
//             lastName: user.last_name,
//             birthDay: user.birth_day,
//             birthMonth: user.birth_month,
//             birthYear: user.birth_year
//         };
//     } catch (err) {
//         console.error('Error during login:', err);
//         return {error: 'An error occurred during logging in the user.'};
//     }
// }

const pool = require('../../config/db');
const bcrypt = require('bcrypt');

const loginUser = async (identity, password) => {
    try {
        const searchUser = await pool.query('SELECT * FROM bookdelight.Users WHERE email = $1 OR username = $1', [identity]);
        if (searchUser.rows.length === 0) {
            return {error: 'User not found.'};
        }

        const user = searchUser.rows[0];


        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return {error: 'Invalid password.'};
        }

        return user;
    } catch (err) {
        console.error('Error during login:', err);
        return { error: 'An error occurred during logging in the user.' };
    }
}

module.exports = { loginUser };
