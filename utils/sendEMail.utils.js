const nodemailer = require('nodemailer');
const sendEmail = async (data) => {
    try {
        const mailOptions = {
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.details,
        };
        const Data = {
            host: process.env.SMTP_Host,
            port: 587,
            secure: Boolean.valueOf(process.env.SMTP_EnableSsl),
            auth: {
                user: process.env.SMTP_UserName,
                pass: process.env.SMTP_Password,
            },
            service: 'Outlook365',
        };
        const transporter = nodemailer.createTransport(Data);
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent:', info.messageId);
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEmail;