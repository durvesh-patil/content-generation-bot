const nodemailer = require('nodemailer')


exports.sendEmailImagesAndPrompts = async (from, to, body) => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.APP_PASSWORD
            },
        });


        const mailOptions = {
            from: `${from}`,
            to: `${to}`,
            subject: 'Content-Images for each paragraph is given in order ',
            text: `${body}`,
        };

        await transporter.sendMail(mailOptions)
        console.log('email sent!!!');

    } catch (err) {
        console.log(err);
    }

}
