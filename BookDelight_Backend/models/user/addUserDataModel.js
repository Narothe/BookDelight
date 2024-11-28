const view = require('../../config/db');

const addUserData = async (userId, browser, os, device) => {
    const query = `
        INSERT INTO bookdelight.Collected_User_Data (id_user, browser_name, browser_version, os_name, os_version, device_type, device_model, device_vendor)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    const values = [
        userId,
        browser.name || null,
        browser.version || null,
        os.name || null,
        os.version || null,
        device.type || null,
        device.model || null,
        device.vendor || null
    ];
    try {
        const result = await view.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while adding the user data:', err);
        return { error: 'An error occurred during adding the user data.' };
    }
};

module.exports = { addUserData };
