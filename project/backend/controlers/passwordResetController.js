const nodemailer = require('nodemailer');

function sendPasswordResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
        // Configure your email service (e.g., Outlook)
        // This example assumes you have already set up nodemailer with Outlook
        // See previous responses for configuring nodemailer
        service: 'outlook',
            auth: {
                user: 'rajib_dev@outlook.com', // Your email address
                pass: 'Rajib@123' // Your email password
            }
    });

    const mailOptions = {
        from: 'your_email@outlook.com',
        to: email,
        subject: 'Password Reset Request',
        text: `To reset your password, click on the following link: http://yourwebsite.com/reset/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}

module.exports = {
    sendPasswordResetEmail
};
