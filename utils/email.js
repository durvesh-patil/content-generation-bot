const nodemailer = require('nodemailer')

exports.sendEmailImagesAndPrompts = async () => {
    try {

        const mailOptions = {
            from: 'konkmk112003@gmail.com',
            to: 'kmk112003@gmail.com',
            subject: 'This is a test email',
            body: 'This is the body of the email.',
        };

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                password: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail(mailOptions);
        console.log(`email sent successfully`);
    } catch (err) {
        console.log(err);
    }
}