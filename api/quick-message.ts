import { sendWithResend } from './resend';
import { storeEnquiry } from './enquiry-store';

type Request = { method?: string; body?: Record<string, string | boolean | undefined> };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body ?? {};
  const name = typeof body.name === 'string' ? body.name : '';
  const email = typeof body.email === 'string' ? body.email : '';
  const contactNumber = typeof body.contactNumber === 'string' ? body.contactNumber : '';
  const message = typeof body.message === 'string' ? body.message : '';

  if (!name || !email || !contactNumber || !message) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const enquiryId = await storeEnquiry({
      authIdToken: typeof body.authIdToken === 'string' ? body.authIdToken : undefined,
      fullName: name,
      email,
      phone: contactNumber,
      enquiryType: ['Quick message'],
      message,
      formKind: 'quick_message',
      formVersion: '2026-04-quick-message-v1',
      accountCreated: Boolean(body.accountCreated),
      businessLead: /business|investment|management|website|owner/i.test(message),
      portfolioOpportunity: /property|portfolio|advertise|management/i.test(message),
      sections: [
        {
          title: 'Quick Message',
          fields: [
            { label: 'Full Name', value: name },
            { label: 'Email Address', value: email },
            { label: 'Contact Number', value: contactNumber },
            { label: 'Message', value: message }
          ]
        }
      ]
    });

    let emailSent = true;
    try {
      await sendWithResend({
        subject: 'Belter Enquiries · Quick Message',
        replyTo: email,
        html: `<h2>Quick Message</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Contact Number:</strong> ${contactNumber}</p><p><strong>Message:</strong> ${message}</p><p><strong>Firestore enquiry:</strong> ${enquiryId}</p>`
      });
    } catch {
      emailSent = false;
    }

    return res.status(200).json({ ok: true, enquiryId, emailSent });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
  }
}
