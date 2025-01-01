const { verifyUser, checkIfUserIsVerified, getUserEmail} = require('../../models/auth/verifyUserModel');
const jwt = require('jsonwebtoken');
const {transporter} = require("../../config/mailConfig");
const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {getUserProfile} = require("../../models/user/getUserModel");

const sendEmailWithRetries = async (mail, maxAttempt = 5) => {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        console.warn(`Attempt ${attempt} to send email...`);
        try {
            await transporter.sendMail(mail);
            console.log('Email sent successfully');
            return;
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt === maxAttempt) {
                console.error('Max retries reached. Failed to send email.');
                throw new Error('Could not send email after multiple attempts');
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

const sendVerify = async (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
    const verifyUrl = `${process.env.URL}/verify-email?token=${token}`;

    let email;

    try {
        email = await getUserEmail(userId);
        email = email.email;
        if (email.error) {
            return email;
        }

    } catch (err) {
        console.error(err);
        return {error: 'An error occurred while getting the user email.', statusCode: 500};
    }

    const mail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `
<p>Click this link to verify your email: </p>
<a href="${verifyUrl}">Verify</a>
`
    }

    try {
        const isVerified = await checkIfUserIsVerified(userId);
        if (isVerified) {
            return {error: 'User is already verified.', statusCode: 400};
        }

        await sendEmailWithRetries(mail);

        return {result: {message: 'Verification email sent.'}, statusCode: 200};
    } catch (err) {
        console.error(err);
        return {error: 'An error occurred while sending the verification email.', statusCode: 500};
    }

}

const verifyToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    try {
        const result = await verifyUser(userId);
        if (result.error) {
            return {error: 'User cannot be marked as Verified.', statusCode: 400};
        }

        return {result: {message: 'User verified successfully.'}, statusCode: 200};
    } catch (err) {
        console.error(err);
        return {error: 'An error occurred while verifying the user.', statusCode: 500};
    }
}

const isVerified = async (userId) => {

    try {
        const checkUser = await checkExistenceOfUser(userId);

        if (!checkUser) {
            return {error: 'User not found', statusCode: 404};
        }

        const result = await checkIfUserIsVerified(userId);

        if (result.length === 0) {
            return {error: 'Verify not found', statusCode: 404};
        }

        return { result, statusCode: 200 };
    } catch (err) {
        console.error('Error while getting the user:', err);
        return { error: 'An error occurred while getting the user.', statusCode: 500 };
    }
}

module.exports = {
    sendVerify,
    verifyToken,
    isVerified
};
