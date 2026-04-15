import { sendWithResend } from './resend';

type Request = { method?: string; body?: Record<string, string> };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    await sendWithResend({
      subject: 'Belter Investments · Quick Message Enquiry',
      html: `<h2>Quick Message</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
  }
}
