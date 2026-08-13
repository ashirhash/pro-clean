import nodemailer from "nodemailer";
import MailDetails from "../utils/interface";
import { buildHtml, buildText } from "@/utils/formateEmail";

export const CONTACT_EMAIL = "info@pro-cleanbristol.co.uk";

console.log("-- ENV's -- ", {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS
});


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_USER,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === "465",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const verifyMailerConnection = async () => {
    const result = await transporter.verify();
    console.log("result: ", result);
    return true;
};


export const sendMail = async (mailDetails: MailDetails) => {
    console.log("Sending Mail");
    
    try {
        if (!(await verifyMailerConnection())) {
            console.log("NodeMailer connection failed, aborting send.");
            return { success: false, error: "SMTP connection failed" };
        }

        const info = await transporter.sendMail({
            from: `"${mailDetails.name} via Website" <${CONTACT_EMAIL}>`,
            replyTo: mailDetails.userEmail,
            to: CONTACT_EMAIL,
            subject: `New Service Request from ${mailDetails.name}`,
            text: buildText(mailDetails),
            html: buildHtml(mailDetails),
        });

        console.log("Message sent:", info);
        return { success: true, messageId: info.messageId };
    } catch (err) {
        console.error("Error while sending mail:", err);
        return { success: false, error: "Failed to send email" };
    }
};