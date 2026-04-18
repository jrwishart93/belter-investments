import { sendWithResend } from './resend';

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  enquiryType?: unknown;
  message?: unknown;
  source?: unknown;
};

type Request = { method?: string; body?: ContactBody };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const normalise = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body ?? {};
  const name = normalise(body.name);
  const email = normalise(body.email);
  const phone = normalise(body.phone);
  const enquiryType = normalise(body.enquiryType) || 'Website enquiry';
  const message = normalise(body.message);
  const source = normalise(body.source) || 'belter.online';

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide your name, email address, and message.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  try {
    await sendWithResend({
      subject: `Belter Enquiries · ${enquiryType}`,
      replyTo: email,
      html: `
        <h2>${escapeHtml(enquiryType)}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Contact Number:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Source:</strong> ${escapeHtml(source)}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email failed', error);
    return res.status(500).json({ message: 'Unable to send your message right now.' });
  }
}
