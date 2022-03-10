import { Job } from "bull";
import nodemailer from 'nodemailer';

const emailProcess = async (job: Job) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail(job.data);

    console.log("Message sent: %s", info.messageId);

    let url = nodemailer.getTestMessageUrl(info);

    console.log(url);

    return nodemailer.getTestMessageUrl(info);
};


export {
    emailProcess
};