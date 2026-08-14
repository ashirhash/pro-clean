import { Resend } from "resend";
import MailDetails from "../utils/interface";
import { buildHtml, buildText } from "@/utils/formateEmail";
import { buildJobHtml, buildJobText, JOB_EMAIL_SUBJECT } from "@/utils/formatJobEmail";

export const CONTACT_EMAIL = "info@pro-cleanbristol.co.uk";
const EMAIL_FROM = "Pro Clean Bristol Website <noreply@pro-cleanbristol.co.uk>";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export const sendMail = async (mailDetails: MailDetails) => {
  console.log("Sending Mail");

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      replyTo: mailDetails.userEmail,
      subject: `New Service Request from ${mailDetails.name}`,
      text: buildText(mailDetails),
      html: buildHtml(mailDetails),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Message sent:", data);
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("Error while sending mail:", err);
    return { success: false, error: "Failed to send email" };
  }
};

export const sendJobCompletionEmail = async ({
  clientEmail,
  beforeImages,
  afterImages,
  invoice,
}: {
  clientEmail: string;
  beforeImages: EmailAttachment[];
  afterImages: EmailAttachment[];
  invoice: EmailAttachment;
}) => {
  const details = {
    clientEmail,
    beforeCount: beforeImages.length,
    afterCount: afterImages.length,
    invoiceFileName: invoice.filename,
  };

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: clientEmail,
      subject: JOB_EMAIL_SUBJECT,
      text: buildJobText(details),
      html: buildJobHtml(details),
      attachments: [...beforeImages, ...afterImages, invoice],
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("Error while sending job completion mail:", err);
    return { success: false, error: "Failed to send email" };
  }
};