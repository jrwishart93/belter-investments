import { Resend } from 'resend';

type EmailRequest = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendWithResend(payload: EmailRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.BELTER_ENQUIRY_TO ?? process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.BELTER_FROM_EMAIL ?? process.env.ENQUIRY_FROM_EMAIL;

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
