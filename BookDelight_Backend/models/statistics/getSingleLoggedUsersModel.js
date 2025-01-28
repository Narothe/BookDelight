const book = require("../../config/db");

const getUniqueLoggedUsers = async (userId) => {
    const query = `
        SELECT DISTINCT s.id_sessions,
                        s.id_user,
                        s.created_at                             AS session_created_at,
                        COALESCE(cud.browser_name, 'Unknown')    AS browser_name,
                        COALESCE(cud.browser_version, 'Unknown') AS browser_version,
                        COALESCE(cud.os_name, 'Unknown')         AS os_name,
                        COALESCE(cud.os_version, 'Unknown')      AS os_version,
                        COALESCE(cud.device_type, 'Unknown')     AS device_type,
                        COALESCE(cud.device_model, 'Unknown')    AS device_model,
                        COALESCE(cud.device_vendor, 'Unknown')   AS device_vendor,
                        up.photo_path,
                        u.username
        FROM bookdelight.sessions s
                 LEFT JOIN (SELECT DISTINCT
                            ON (id_user, browser_name, browser_version, os_name, os_version, device_type, device_model, device_vendor)
                                id_user, browser_name, browser_version, os_name, os_version, device_type, device_model, device_vendor, creation_date
                            FROM bookdelight.Collected_User_Data
                            ORDER BY id_user DESC) cud
                           ON s.id_user = cud.id_user
                               AND DATE (cud.creation_date) = DATE (s.created_at)
            LEFT JOIN bookdelight.user_photos up
            LEFT JOIN bookdelight.users u ON up.id_user = u.id_user
        ON s.id_user = up.id_user
        WHERE s.id_user = $1
        ORDER BY s.created_at DESC;
    `;

    const values = [userId];

    try {
        const result = await book.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error while getting the user info:', err);
        return { error: 'An error occurred during getting the user info.' };
    }
};

module.exports = { getUniqueLoggedUsers };
