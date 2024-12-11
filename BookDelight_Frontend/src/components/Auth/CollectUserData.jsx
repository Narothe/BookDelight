import {UAParser} from "ua-parser-js";
import axios from "axios";

// Collects user data (browser, OS, device) and sends it to the backend.

async function CollectUserData(token) {
    if (!token) {
        console.error("Token is missing. Cannot send device data.");
        return;
    }

    const parser = new UAParser();
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const deviceData = {
        browser: {
            name: browser.name || "Unknown",
            version: browser.version || "Unknown",
        },
        os: {
            name: os.name || "Unknown",
            version: os.version || "Unknown",
        },
        device: {
            type: device.type || "Unknown",
            model: device.model || "Unknown",
            vendor: device.vendor || "Unknown",
        },
    };

    try {
        await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/user/collect-user-data`,
            deviceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log("Device data sent successfully:", response.data);
    } catch (err) {
        console.error("Failed to send device data:", err);
    }
}

export default CollectUserData;
