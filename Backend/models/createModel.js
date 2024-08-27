const client = require('../config/db');

const createUser = async (email, hashedPassword, username, firstName, lastName, birthDay, birthMonth, birthYear) => {
    const query = `
        INSERT INTO bookdelight.Users (email, password, username, first_name, last_name, birth_day, birth_month, birth_year, creation_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
            RETURNING id_user`;

    const values = [email, hashedPassword, username, firstName, lastName, birthDay, birthMonth, birthYear];
    const result = await client.query(query, values);

    return result.rows[0].id_user;
};

module.exports = { createUser };
