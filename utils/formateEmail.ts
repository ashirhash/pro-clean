import MailDetails from "../utils/interface";

export const buildHtml = (mailDetails: MailDetails) => {
  const { name, userEmail, message } = mailDetails;
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 24px;">
    <div style="max-width: 560px; margin: 0 auto; background:#ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
      <div style="background-color:#0f766e; padding: 20px 24px;">
        <h2 style="margin:0; color:#ffffff; font-size: 18px;">New Service Request</h2>
      </div>
      <div style="padding: 24px;">
        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color:#6b7280; font-size:13px; width: 90px;">Name</td>
            <td style="padding: 8px 0; color:#111827; font-size:14px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color:#6b7280; font-size:13px;">Email</td>
            <td style="padding: 8px 0; color:#111827; font-size:14px;">
              <a href="mailto:${escapeHtml(userEmail)}" style="color:#0f766e; text-decoration:none;">${escapeHtml(userEmail)}</a>
            </td>
          </tr>
        </table>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <p style="margin:0 0 8px 0; color:#6b7280; font-size:13px;">Message</p>
          <p style="margin:0; color:#111827; font-size:14px; line-height:1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </div>
      <div style="background:#f9fafb; padding: 12px 24px; font-size:12px; color:#9ca3af;">
        Sent from the contact form on pro-cleanbristol.co.uk
      </div>
    </div>
  </div>`;
};

export const buildText = ({ name, userEmail, message }: MailDetails) =>
  `New Service Request\n\nName: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`;

// Basic escaping so submitted text can't break the HTML layout
export const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
