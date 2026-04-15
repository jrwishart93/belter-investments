const RESEND_API_URL = 'https://api.resend.com/emails';

type EmailRequest = {
  subject: string;
  html: string;
};

export async function sendWithResend(payload: EmailRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error('Missing RESEND_API_KEY, ENQUIRY_TO_EMAIL, or ENQUIRY_FROM_EMAIL environment variable.');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: payload.subject,
      html: payload.html
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend error: ${details}`);
  }
}
