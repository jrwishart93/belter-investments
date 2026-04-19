import { storeEnquiry } from './enquiry-store.js';
import { sendWithResend, confirmationHtml } from './resend.js';

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };
type InvestmentEnquiryBody = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  preferredContact?: unknown;
  serviceInterest?: unknown;
  propertyOwnership?: unknown;
  propertyAddressOrArea?: unknown;
  propertyType?: unknown;
  bedrooms?: unknown;
  occupied?: unknown;
  letType?: unknown;
  shortTermOperated?: unknown;
  shortTermLicenceStatus?: unknown;
  platforms?: unknown;
  currentlyRented?: unknown;
  managementType?: unknown;
  advertisingHelp?: unknown;
  advertisedWhere?: unknown;
  websiteHelp?: unknown;
  websiteGoals?: unknown;
  investmentInterest?: unknown;
  estimatedValue?: unknown;
  timeline?: unknown;
  goals?: unknown;
  message?: unknown;
  moveForward?: unknown;
  sections?: unknown;
  authIdToken?: unknown;
  accountCreated?: unknown;
};
type Request = { method?: string; body?: InvestmentEnquiryBody };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const normalise = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const normaliseList = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : []);
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

function renderSection(section: EnquirySection) {
  return `
    <h3>${escapeHtml(section.title ?? '')}</h3>
    ${(section.fields ?? [])
      .map((field) => `<p><strong>${escapeHtml(field.label ?? '')}:</strong> ${escapeHtml(field.value ?? '')}</p>`)
      .join('')}
  `;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body ?? {};
  const fullName = normalise(body.fullName);
  const email = normalise(body.email);
  const phone = normalise(body.phone);
  const message = normalise(body.message);
  const serviceInterest = normaliseList(body.serviceInterest);
  const sections = normaliseSections(body.sections);
  const goals = normaliseList(body.goals);
  const websiteGoals = normaliseList(body.websiteGoals);
  const investmentInterest = normalise(body.investmentInterest);
  const letType = normalise(body.letType);
  const timeline = normalise(body.timeline);

  if (!fullName || !email || !phone || serviceInterest.length === 0 || !message) {
    return res.status(400).json({ message: 'Please add your name, email, phone number, what you need help with, and a short message.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  try {
    const authIdToken = typeof body.authIdToken === 'string' ? body.authIdToken : undefined;

    const stored = await storeEnquiry({
      authIdToken,
      fullName,
      email,
      phone,
      enquiryType: ['Investment / business enquiry', ...serviceInterest],
      message,
      formKind: 'investment_business_enquiry',
      formVersion: '2026-04-investment-business-v1',
      accountCreated: Boolean(body.accountCreated || authIdToken),
      businessLead: true,
      portfolioOpportunity: /sell|portfolio|investment|introduc|opportunity|property/i.test(`${serviceInterest.join(' ')} ${investmentInterest}`),
      sections,
      businessLeadSummary: {
        serviceInterest,
        propertyCount: normalise(body.bedrooms),
        areasCovered: normalise(body.propertyAddressOrArea),
        propertyAddressOrArea: normalise(body.propertyAddressOrArea),
        propertyType: normalise(body.propertyType),
        bedrooms: normalise(body.bedrooms),
        letType,
        timeline,
        goals,
        websiteGoals,
        needsLicensingHelp: normalise(body.shortTermLicenceStatus).length > 0,
        needsWebsiteHelp: serviceInterest.includes('Website Design for your Property') || websiteGoals.length > 0,
        needsManagementHelp: serviceInterest.some((item) => /management|support|let/i.test(item))
      }
    });

    let emailSent = true;
    try {
      await sendWithResend({
        subject: 'Belter Enquiries · Investment / Business Enquiry',
        replyTo: email,
        html: `
          <h2>Investment / Business Enquiry</h2>
          ${sections.map(renderSection).join('')}
          <p><strong>Firestore enquiry:</strong> ${escapeHtml(stored.enquiryId)}</p>
          ${stored.businessLeadId ? `<p><strong>Business lead:</strong> ${escapeHtml(stored.businessLeadId)}</p>` : ''}
        `
      });
      await sendWithResend({
        subject: "We've received your enquiry – Belter Investments",
        to: email,
        html: confirmationHtml(fullName, 'investment / business enquiry')
      });
    } catch {
      emailSent = false;
    }

    return res.status(200).json({ ok: true, enquiryId: stored.enquiryId, businessLeadId: stored.businessLeadId, emailSent });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unable to submit investment enquiry right now.' });
  }
}
