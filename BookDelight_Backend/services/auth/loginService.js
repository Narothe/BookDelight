const { loginUser, loginPassword } = require("../../models/auth/loginModel");
const { checkUserLoginModel, saveDevice } = require("../../models/auth/checkUserLoginModel");
const jwt = require('jsonwebtoken');
const { createSession } = require("../../models/auth/sessionControlModel");
const {sendEmailWithRetries} = require('../../utils/sendEmailWithRetries');
require('dotenv').config();

const login = async (content, deviceData) => {
    const { identity, password } = content;

    if (!identity || !password) {
        console.error('Email or username and password are required.');
        return { error: 'Email or username and password are required.', statusCode: 400 };
    }

    try {
        const result = await loginUser(identity);

        if (result.error) {
            return { error: 'Invalid email or username.', message: result.error, statusCode: 401 };
        }

        const userId = result.id_user;

        const checkUserPassword = await loginPassword(userId, password);

        if (checkUserPassword.error) {
            return { error: 'Invalid password.', message: checkUserPassword.error, statusCode: 401 };
        }

        const isAdmin = result.is_admin;

        const token = jwt.sign({ userId: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });

        const session = await createSession(userId, token, new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

        if (session.error) {
            return { error: 'An error occurred during adding the session.', statusCode: 500 };
        }

        const existingDevice = await checkUserLoginModel(userId, deviceData);

        if (!existingDevice) {
            const mail = {
                from: process.env.EMAIL_USER,
                to: result.email,
                subject: 'New Device Login Detected',
                html: `
                    <p>Hello ${result.username},</p>
                    <p>We've detected a login to your account from a new device:</p>
                    <ul>
                        <li><strong>Browser:</strong> ${deviceData.browser_name} ${deviceData.browser_version}</li>
                        <li><strong>Operating System:</strong> ${deviceData.os_name} ${deviceData.os_version}</li>
                        <li><strong>Device:</strong> ${deviceData.device_type || 'Unknown'} ${deviceData.device_model || 'Unknown'} (${deviceData.device_vendor || 'Unknown'})</li>
                    </ul>
                    <p>If this wasn't you, please secure your account immediately.</p>
                `,
            };
            await sendEmailWithRetries(mail);

            await saveDevice(userId, deviceData);
        }

        return {
            result: {
                message: 'User logged in successfully',
                token,
                user: {
                    userId: result.id_user,
                    email: result.email,
                    username: result.username,
                    isAdmin: result.is_admin,
                },
            },
            statusCode: 200,
        };
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred during logging in the user.', statusCode: 500 };
    }
};

module.exports = { login };
