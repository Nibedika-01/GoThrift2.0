const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = async (to, subject, html) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "gothrift7@gmail.com",
                pass: "nnqywkzushxtewlx",
            },
        })

        const mailOptions = {
            from: "gothrift7@gmail.com",
            to,
            subject,
            html,
        }

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(error){
        console.log("Error sending email:", error)
        throw new Error("Email could not be sent")
    }
}

module.exports = sendEmail