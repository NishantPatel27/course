const nodemailer = require('nodemailer')

const mailSender = async(email , title , body) => {
    try
    {
        if (!email){
            throw new Error ("No Email Found");
        }
        const transporter = nodemailer.createTransport({
            service: "Outlook",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: "CodeHella",
            to: email, // Use the email parameter as the recipient
            subject: title,
            html: body
        });
        console.log(info);
        return info;
        
    }catch (err) {
        console.log("Error occurred in transporter", err);
        throw err;
    }
}
module.exports = mailSender