import { sendWithResend } from './resend';

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };
type Request = { method?: string; body?: { fullName?: string; email?: string; contactNumber?: string; sections?: EnquirySection[] } };
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
    await sendWithResend({
      subject: 'Belter Enquiries · Property Enquiry',
      html: `
        <h2>Detailed Rental Enquiry</h2>
        ${body.sections.map(renderSection).join('')}
      `
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
  }
}
