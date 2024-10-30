const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
})

transporter.verify(async (error, maxAttempt = 5) => {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        console.warn(`Attempt ${attempt} to verify SMTP configuration...`);
        try {
            await transporter.verify();
            console.log('SMTP server is ready to send emails');
            break;
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt === maxAttempt) {
                console.error('Max retries reached. SMTP setup failed.', error);
                throw new Error('Could not verify SMTP configuration after multiple attempts');
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
});


module.exports = { transporter };
