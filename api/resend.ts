import { Resend } from 'resend';

type EmailRequest = {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
};

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function sendWithResend(payload: EmailRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const defaultTo = process.env.BELTER_ENQUIRY_TO ?? process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.BELTER_FROM_EMAIL ?? process.env.ENQUIRY_FROM_EMAIL;
  const toEmail = payload.to ?? defaultTo;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error('Missing RESEND_API_KEY, BELTER_ENQUIRY_TO, or BELTER_FROM_EMAIL environment variable.');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: payload.subject,
    html: payload.html,
    replyTo: payload.replyTo
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

export function confirmationHtml(name: string, enquiryLabel: string) {
  const escaped = escapeHtml(name);
  return `
    <p>Hi ${escaped},</p>
    <p>Thank you for submitting your <strong>${enquiryLabel}</strong> with Belter Investments. We've received your enquiry and a member of our team will be in touch with you shortly.</p>
    <p>If you have any urgent questions in the meantime, please don't hesitate to reply to this email.</p>
    <p>Kind regards,<br/>The Belter Investments Team</p>
  `;
}

export function renderEnquirySectionsHtml(sections: EnquirySection[]) {
  return sections
    .map((section) => {
      const fields = section.fields ?? [];
      if (!section.title || fields.length === 0) {
        return '';
      }

      return `
        <section style="margin: 0 0 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px;">${escapeHtml(section.title)}</h3>
          ${fields
            .map((field) => `
              <p style="margin: 0 0 8px;">
                <strong>${escapeHtml(field.label ?? '')}:</strong>
                ${escapeHtml(field.value ?? '')}
              </p>
            `)
            .join('')}
        </section>
      `;
    })
    .join('');
}

export function detailedConfirmationWithCopyHtml(name: string, sections: EnquirySection[]) {
  return groupedEnquiryConfirmationHtml(name, 'detailed rental enquiry', sections);
}

export function groupedEnquiryConfirmationHtml(name: string, enquiryLabel: string, sections: EnquirySection[]) {
  return `
    ${confirmationHtml(name, enquiryLabel)}
    <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
    <h2 style="margin: 0 0 16px;">Copy of your submitted enquiry</h2>
    ${renderEnquirySectionsHtml(sections)}
  `;
}
