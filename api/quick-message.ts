import { sendWithResend } from './resend';
import { storeEnquiry } from './enquiry-store';

type Request = { method?: string; body?: Record<string, string | boolean | undefined> };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, contactNumber, message } = req.body ?? {};

  if (!name || !email || !contactNumber || !message) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const enquiryId = await storeEnquiry({
      authIdToken: typeof req.body?.authIdToken === 'string' ? req.body.authIdToken : undefined,
      fullName: name,
      email,
      phone: contactNumber,
      enquiryType: ['Quick message'],
      message,
      accountCreated: Boolean(req.body?.accountCreated),
      businessLead: /business|investment|management|website|owner/i.test(message),
      portfolioOpportunity: /property|portfolio|advertise|management/i.test(message)
    });

    await sendWithResend({
      subject: 'Belter Enquiries · Quick Message',
      html: `<h2>Quick Message</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Contact Number:</strong> ${contactNumber}</p><p><strong>Message:</strong> ${message}</p>${enquiryId ? `<p><strong>Firestore enquiry:</strong> ${enquiryId}</p>` : '<p><strong>Firestore:</strong> Not configured for this environment.</p>'}`
    });
    return res.status(200).json({ ok: true, enquiryId });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
  }
}
