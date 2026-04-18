import { Resend } from 'resend';

type EmailRequest = {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
};

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
  const escaped = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <p>Hi ${escaped},</p>
    <p>Thank you for submitting your <strong>${enquiryLabel}</strong> with Belter Investments. We've received your enquiry and a member of our team will be in touch with you shortly.</p>
    <p>If you have any urgent questions in the meantime, please don't hesitate to reply to this email.</p>
    <p>Kind regards,<br/>The Belter Investments Team</p>
  `;
}
