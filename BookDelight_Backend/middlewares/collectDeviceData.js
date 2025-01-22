const parser = require('ua-parser-js');

const collectDeviceData = (req, res, next) => {
    const ua = parser(req.headers['user-agent'] || '');
    req.deviceData = {
        browser_name: ua.browser.name || 'Unknown',
        browser_version: ua.browser.version || 'Unknown',
        os_name: ua.os.name || 'Unknown',
        os_version: ua.os.version || 'Unknown',
        device_type: ua.device.type || 'Unknown',
        device_model: ua.device.model || 'Unknown',
        device_vendor: ua.device.vendor || 'Unknown',
    };
    next();
};

module.exports = collectDeviceData;
