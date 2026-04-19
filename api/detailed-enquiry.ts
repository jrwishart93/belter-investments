import { detailedConfirmationWithCopyHtml, escapeHtml, renderEnquirySectionsHtml, sendWithResend } from './resend.js';
import { storeEnquiry } from './enquiry-store.js';

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };
type Request = { method?: string; body?: { fullName?: string; email?: string; contactNumber?: string; sections?: EnquirySection[]; authIdToken?: string; accountCreated?: boolean } };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

const normalise = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function normaliseSections(value: unknown): EnquirySection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const sections: EnquirySection[] = [];

  value.forEach((sectionValue: unknown) => {
    if (!sectionValue || typeof sectionValue !== 'object') {
      return;
    }

    const sectionRecord = sectionValue as { title?: unknown; fields?: unknown };
    const title = normalise(sectionRecord.title);

    if (!title || !Array.isArray(sectionRecord.fields)) {
      return;
    }

    const fields: EnquiryField[] = [];
    sectionRecord.fields.forEach((fieldValue: unknown) => {
      if (!fieldValue || typeof fieldValue !== 'object') {
        return;
      }

      const fieldRecord = fieldValue as { label?: unknown; value?: unknown };
      const label = normalise(fieldRecord.label);
      const fieldText = normalise(fieldRecord.value);

      if (label && fieldText) {
        fields.push({ label, value: fieldText });
      }
    });

    if (fields.length > 0) {
      sections.push({ title, fields });
    }
  });

  return sections;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body ?? {};
  const fullName = normalise(body.fullName);
  const email = normalise(body.email);
  const contactNumber = normalise(body.contactNumber);
  const sections = normaliseSections(body.sections);

  if (!fullName || !email || !contactNumber || sections.length === 0) {
    return res.status(400).json({ message: 'Please add your name, email, contact number, and enquiry details before submitting.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address so we can send you a copy of your enquiry.' });
  }

  try {
    const propertyField = sections
      .flatMap((section) => section.fields ?? [])
      .find((field) => field.label === 'Which property are you enquiring about?');
    const stored = await storeEnquiry({
      authIdToken: body.authIdToken,
      fullName,
      email,
      phone: contactNumber,
      enquiryType: ['Detailed rental enquiry'],
      message: propertyField?.value ? `Property enquiry: ${propertyField.value}` : 'Detailed rental enquiry',
      formKind: 'detailed_rental_enquiry',
      formVersion: '2026-04-detailed-rental-v1',
      accountCreated: Boolean(body.accountCreated),
      businessLead: false,
      portfolioOpportunity: false,
      sections
    });

    await sendWithResend({
      subject: 'Belter Enquiries · Detailed Rental Enquiry',
      replyTo: email,
      html: `
        <h2>Detailed Rental Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Contact Number:</strong> ${escapeHtml(contactNumber)}</p>
        ${renderEnquirySectionsHtml(sections)}
        <p><strong>Firestore enquiry:</strong> ${escapeHtml(stored.enquiryId)}</p>
      `
    });

    let applicantEmailSent = true;
    try {
      await sendWithResend({
        subject: "We've received your detailed rental enquiry – Belter Investments",
        to: email,
        html: detailedConfirmationWithCopyHtml(fullName, sections)
      });
    } catch {
      applicantEmailSent = false;
    }

    return res.status(200).json({
      ok: true,
      enquiryId: stored.enquiryId,
      businessLeadId: stored.businessLeadId,
      emailSent: true,
      companyEmailSent: true,
      applicantEmailSent
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error
        ? error.message
        : 'Unable to submit your detailed enquiry right now. Please try again shortly.'
    });
  }
}
