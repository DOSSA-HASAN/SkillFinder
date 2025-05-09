import nodemailer from "nodemailer"

export const SendEmail = async (to, subject, text, html) => {
    try {

        const mailOptions = {
            from: process.env.USER,
            to,
            subject,
            html
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            }
        })

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(`Error occurred while sending email: ${error.message}`)
    }
}