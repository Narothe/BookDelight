const { verifyUser, checkIfUserIsVerified, getUserEmail} = require('../../models/auth/verifyUserModel');
const jwt = require('jsonwebtoken');
const {transporter} = require("../../config/mailConfig");
const {checkExistenceOfUser} = require("../../models/user/checkVariousUserBookmarks");
const {getUserProfile} = require("../../models/user/getUserModel");
const {sendEmailWithRetries} = require("../../utils/sendEmailWithRetries");



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
        subject: 'Verify Your Email Address',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            width: 150px;
            margin-bottom: 10px;
        }
        .header h1 {
            font-size: 24px;
            color: #555;
        }
        .content {
            text-align: center;
        }
        .content p {
            margin-bottom: 20px;
        }
        .verify-button {
            display: inline-block;
            padding: 12px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bookdelight</h1>
            <h2>Verify Your Email Address</h2>
        </div>
        <div class="content">
            <p>Thank you for verify your account! Please click the button below to verify your email address:</p>
            <a href="${verifyUrl}" class="verify-button">Verify Email</a>
            <p>If you didn't sign up, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Bookdelight. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    };


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
