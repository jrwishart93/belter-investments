import { sendWithResend } from './resend';
import { storeEnquiry } from './enquiry-store';

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };
type Request = { method?: string; body?: { fullName?: string; email?: string; contactNumber?: string; sections?: EnquirySection[]; authIdToken?: string; accountCreated?: boolean } };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderSection = (section: EnquirySection) => {
  const fields = section.fields ?? [];
  if (!section.title || fields.length === 0) {
    return '';
  }

  return `
    <h3>${escapeHtml(section.title)}</h3>
    ${fields.map((field) => `<p><strong>${escapeHtml(field.label ?? '')}:</strong> ${escapeHtml(field.value ?? '')}</p>`).join('')}
  `;
};

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body ?? {};

  if (!body.fullName || !body.email || !body.contactNumber || !Array.isArray(body.sections)) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const propertyField = body.sections
      .flatMap((section) => section.fields ?? [])
      .find((field) => field.label === 'Which property are you enquiring about?');
    const enquiryId = await storeEnquiry({
      authIdToken: body.authIdToken,
      fullName: body.fullName,
      email: body.email,
      phone: body.contactNumber,
      enquiryType: ['Detailed rental enquiry'],
      message: propertyField?.value ? `Property enquiry: ${propertyField.value}` : 'Detailed rental enquiry',
      accountCreated: Boolean(body.accountCreated),
      businessLead: false,
      portfolioOpportunity: false,
      sections: body.sections
    });

    await sendWithResend({
      subject: 'Belter Enquiries · Property Enquiry',
      html: `
        <h2>Detailed Rental Enquiry</h2>
        ${body.sections.map(renderSection).join('')}
        ${enquiryId ? `<p><strong>Firestore enquiry:</strong> ${escapeHtml(enquiryId)}</p>` : '<p><strong>Firestore:</strong> Not configured for this environment.</p>'}
      `
    });

    return res.status(200).json({ ok: true, enquiryId });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
  }
}
