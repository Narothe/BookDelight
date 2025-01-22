const {transporter} = require("../config/mailConfig");
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

module.exports = { sendEmailWithRetries };
