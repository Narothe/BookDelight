const db = require('../../config/db');

const checkUserLoginModel = async (userId, deviceData) => {
    try {
        const result = await db.query(`
            SELECT * 
            FROM bookdelight.Collected_User_Data 
            WHERE id_user = $1 
              AND browser_name = $2 
              AND browser_version = $3 
              AND os_name = $4 
              AND os_version = $5 
              AND device_type = $6 
              AND device_model = $7 
              AND device_vendor = $8
        `, [
            userId,
            deviceData.browser_name,
            deviceData.browser_version,
            deviceData.os_name,
            deviceData.os_version,
            deviceData.device_type,
            deviceData.device_model,
            deviceData.device_vendor,
        ]);

        // console.log('Device check result:', result.rowCount);

        return result.rowCount > 0;
    } catch (error) {
        console.error('Error checking device:', error);
        return null;
    }
};

const saveDevice = async (userId, deviceData) => {
    try {
        await db.query(`
            INSERT INTO bookdelight.Collected_User_Data 
            (id_user, browser_name, browser_version, os_name, os_version, device_type, device_model, device_vendor, creation_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        `, [
            userId,
            deviceData.browser_name,
            deviceData.browser_version,
            deviceData.os_name,
            deviceData.os_version,
            deviceData.device_type,
            deviceData.device_model,
            deviceData.device_vendor,
        ]);

        // console.log('Device saved successfully.');

        return true;
    } catch (error) {
        console.error('Error saving device:', error);
        return false;
    }
};

module.exports = { checkUserLoginModel, saveDevice  };
