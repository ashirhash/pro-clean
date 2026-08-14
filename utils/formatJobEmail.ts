import { JobEmailDetails } from "./interface";
import { escapeHtml } from "./formateEmail";

export const JOB_EMAIL_SUBJECT =
  "Your Clean is Complete — Before & After Photos Inside";

const photoLabel = (count: number) => `${count} photo${count === 1 ? "" : "s"}`;

export const buildJobHtml = ({
  clientEmail,
  beforeCount,
  afterCount,
}: JobEmailDetails) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding: 24px;">
    <div style="max-width: 560px; margin: 0 auto; background:#ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
      <div style="background-color:#0f766e; padding: 20px 24px;">
        <h2 style="margin:0; color:#ffffff; font-size: 18px;">Your Clean is Complete</h2>
      </div>
      <div style="padding: 24px;">
        <p style="margin:0 0 16px 0; color:#111827; font-size:14px; line-height:1.6;">Hi there,</p>
        <p style="margin:0 0 16px 0; color:#111827; font-size:14px; line-height:1.6;">
          Great news — your Pro Clean Bristol visit is complete! We've attached a quick before-and-after look so you can see exactly what we tackled.
        </p>
        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color:#6b7280; font-size:13px; width: 90px;">Before</td>
            <td style="padding: 8px 0; color:#111827; font-size:14px;">${photoLabel(beforeCount)} attached — how we found the space</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color:#6b7280; font-size:13px;">After</td>
            <td style="padding: 8px 0; color:#111827; font-size:14px;">${photoLabel(afterCount)} attached — how we left it</td>
          </tr>
        </table>
        <p style="margin:0 0 16px 0; color:#111827; font-size:14px; line-height:1.6;">
          If anything doesn't look right, just reply to this email and we'll sort it out.
        </p>
        <p style="margin:0; color:#111827; font-size:14px; line-height:1.6;">
          Thanks for choosing Pro Clean Bristol!
        </p>
      </div>
      <div style="background:#f9fafb; padding: 12px 24px; font-size:12px; color:#9ca3af;">
        Sent to ${escapeHtml(clientEmail)} by Pro Clean Bristol
      </div>
    </div>
  </div>`;

export const buildJobText = ({
  clientEmail,
  beforeCount,
  afterCount,
}: JobEmailDetails) =>
  `Your Clean is Complete\n\nHi there,\n\nGreat news — your Pro Clean Bristol visit is complete! We've attached a quick before-and-after look so you can see exactly what we tackled.\n\nBefore: ${photoLabel(beforeCount)} attached — how we found the space\nAfter: ${photoLabel(afterCount)} attached — how we left it\n\nIf anything doesn't look right, just reply to this email and we'll sort it out.\n\nThanks for choosing Pro Clean Bristol!\n\nSent to ${clientEmail} by Pro Clean Bristol`;
