import { CategoryCount, JobEmailDetails } from "./interface";
import { escapeHtml } from "./formateEmail";

export const JOB_EMAIL_SUBJECT = "Your cleaning is complete – Pro Clean Bristol";

const photoLabel = (count: number) => `${count} photo${count === 1 ? "" : "s"}`;

const categoryListHtml = (categories: CategoryCount[]) =>
  `<ul style="margin:0 0 12px 0; padding-left:18px;">${categories
    .map(
      (c) =>
        `<li style="margin:0 0 2px 0;">${escapeHtml(c.label)}: ${photoLabel(c.count)}</li>`
    )
    .join("")}</ul>`;

export const buildJobHtml = ({
  beforeCount,
  afterCount,
  invoiceFileName,
  beforeCategories = [],
  afterCategories = [],
}: JobEmailDetails) => `
  <div style="font-family: Arial, Helvetica, sans-serif; color:#111827; font-size:14px; line-height:1.6; max-width: 560px; margin: 0 auto; padding: 24px; border-left: 3px solid #3b08a1;">
    <p style="margin:0 0 4px 0; color:#3b08a1; font-size:12px; font-weight:bold; letter-spacing: 0.3px; text-transform: uppercase;">Pro Clean Bristol</p>
    <h1 style="margin:0 0 16px 0; font-size:17px; font-weight:600; color:#111827;">Your cleaning is complete</h1>

    <p style="margin:0 0 16px 0;">Hi there,</p>

    <p style="margin:0 0 16px 0;">
      Your Pro Clean Bristol visit is complete. Attached is a quick before-and-after look so you can see what we tackled${invoiceFileName ? ", along with your invoice" : ""}.
    </p>

    <p style="margin:0 0 4px 0; color:#6b7280; font-size:13px;">Before — how we found the space</p>
    ${
      beforeCategories.length > 0
        ? categoryListHtml(beforeCategories)
        : `<p style="margin:0 0 12px 0;">${photoLabel(beforeCount)} attached</p>`
    }

    <p style="margin:0 0 4px 0; color:#6b7280; font-size:13px;">After — how we left it</p>
    ${
      afterCategories.length > 0
        ? categoryListHtml(afterCategories)
        : `<p style="margin:0 0 12px 0;">${photoLabel(afterCount)} attached</p>`
    }

    ${
      invoiceFileName
        ? `<p style="margin:0 0 4px 0; color:#6b7280; font-size:13px;">Invoice</p>
    <p style="margin:0 0 16px 0;">Attached — ${escapeHtml(invoiceFileName)}</p>`
        : ""
    }

    <p style="margin:0 0 16px 0;">
      If anything doesn't look right, feel free to contact us and we'll sort it out.
    </p>

    <p style="margin:0 0 20px 0;">
      Thanks for choosing Pro Clean Bristol!
    </p>

    <p style="margin:0; font-size:12px; color:#9ca3af;">
      Pro Clean Bristol · <a href="https://pro-cleanbristol.co.uk" style="color:#3b08a1; text-decoration:none;">pro-cleanbristol.co.uk</a>
    </p>
  </div>`;

const categoryListText = (categories: CategoryCount[]) =>
  categories.map((c) => `  ${c.label}: ${photoLabel(c.count)}`).join("\n");

export const buildJobText = ({
  beforeCount,
  afterCount,
  invoiceFileName,
  beforeCategories = [],
  afterCategories = [],
}: JobEmailDetails) =>
  `Hi there,\n\nYour Pro Clean Bristol visit is complete. Attached is a quick before-and-after look so you can see what we tackled${invoiceFileName ? ", along with your invoice" : ""}.\n\nBefore — how we found the space:\n${
    beforeCategories.length > 0
      ? categoryListText(beforeCategories)
      : `  ${photoLabel(beforeCount)} attached`
  }\n\nAfter — how we left it:\n${
    afterCategories.length > 0
      ? categoryListText(afterCategories)
      : `  ${photoLabel(afterCount)} attached`
  }${
    invoiceFileName ? `\nInvoice: Attached — ${invoiceFileName}` : ""
  }\n\nIf anything doesn't look right, feel free to contact us and we'll sort it out.\n\nThanks for choosing Pro Clean Bristol!`;