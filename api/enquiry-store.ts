import { getAdminServices } from './firebase-admin.js';

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };
type EnquiryAnswer = {
  section: string;
  label: string;
  value: string;
};

export type BusinessLeadSummary = {
  serviceInterest: string[];
  propertyCount?: string;
  areasCovered?: string;
  needsLicensingHelp?: boolean;
  needsWebsiteHelp?: boolean;
  needsManagementHelp?: boolean;
  websiteGoals?: string[];
  propertyAddressOrArea?: string;
  propertyType?: string;
  bedrooms?: string;
  letType?: string;
  timeline?: string;
  goals?: string[];
  ownerUid?: string | null;
  companyName?: string;
};

export type StoreEnquiryInput = {
  authIdToken?: string;
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string[];
  message: string;
  formKind: 'quick_message' | 'detailed_rental_enquiry' | 'investment_business_enquiry';
  formVersion: string;
  accountCreated?: boolean;
  businessLead?: boolean;
  portfolioOpportunity?: boolean;
  sections?: EnquirySection[];
  businessLeadSummary?: BusinessLeadSummary;
};

const normaliseText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

function normaliseSections(sections: EnquirySection[] = []) {
  return sections
    .map((section) => ({
      title: normaliseText(section.title),
      fields: (section.fields ?? [])
        .map((field) => ({
          label: normaliseText(field.label),
          value: normaliseText(field.value)
        }))
        .filter((field) => field.label && field.value)
    }))
    .filter((section) => section.title && section.fields.length > 0);
}

function flattenAnswers(sections: EnquirySection[]): EnquiryAnswer[] {
  return sections.flatMap((section) =>
    (section.fields ?? []).map((field) => ({
      section: section.title ?? '',
      label: field.label ?? '',
      value: field.value ?? ''
    }))
  );
}

export async function storeEnquiry(input: StoreEnquiryInput) {
  const services = getAdminServices();
  if (!services) {
    throw new Error('Firestore is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
  }

  let submittedByUid: string | null = null;
  if (input.authIdToken) {
    const token = await services.auth.verifyIdToken(input.authIdToken);
    submittedByUid = token.uid;
  }

  const now = services.FieldValue.serverTimestamp();
  const sections = normaliseSections(input.sections);
  const answers = flattenAnswers(sections);
  const docRef = await services.db.collection('enquiries').add({
    createdAt: now,
    updatedAt: now,
    formKind: input.formKind,
    formVersion: input.formVersion,
    source: 'website',
    submittedByUid,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    enquiryType: input.enquiryType,
    propertyAddressOrArea: input.businessLeadSummary?.propertyAddressOrArea ?? '',
    propertyType: input.businessLeadSummary?.propertyType ?? '',
    bedrooms: input.businessLeadSummary?.bedrooms ?? '',
    ownershipStatus: '',
    letType: input.businessLeadSummary?.letType ?? (input.enquiryType.includes('Detailed rental enquiry') ? 'long_term' : ''),
    currentlyAdvertised: '',
    advertisingPlatforms: [],
    needsWebsite: Boolean(input.businessLeadSummary?.needsWebsiteHelp),
    websiteGoals: input.businessLeadSummary?.needsWebsiteHelp ? input.businessLeadSummary.websiteGoals ?? [] : [],
    investmentInterestType: input.formKind === 'investment_business_enquiry' ? input.enquiryType.join(', ') : '',
    timeline: input.businessLeadSummary?.timeline ?? '',
    goals: input.businessLeadSummary?.goals ?? [],
    message: input.message,
    status: 'new',
    accountCreated: Boolean(input.accountCreated || submittedByUid),
    internalLeadScore: 0,
    assignedToUid: '',
    businessLead: Boolean(input.businessLead),
    portfolioOpportunity: Boolean(input.portfolioOpportunity),
    sections,
    answers,
    answerCount: answers.length
  });

  if (submittedByUid) {
    await services.db.collection('users').doc(submittedByUid).set(
      {
        linkedEnquiryIds: services.FieldValue.arrayUnion(docRef.id),
        updatedAt: now
      },
      { merge: true }
    );
  }

  let businessLeadId: string | null = null;
  if (input.businessLeadSummary) {
    const leadRef = await services.db.collection('businessLeads').add({
      ownerUid: input.businessLeadSummary.ownerUid ?? submittedByUid,
      enquiryId: docRef.id,
      companyName: input.businessLeadSummary.companyName ?? '',
      serviceInterest: input.businessLeadSummary.serviceInterest,
      propertyCount: input.businessLeadSummary.propertyCount ?? '',
      areasCovered: input.businessLeadSummary.areasCovered ?? input.businessLeadSummary.propertyAddressOrArea ?? '',
      needsLicensingHelp: Boolean(input.businessLeadSummary.needsLicensingHelp),
      needsWebsiteHelp: Boolean(input.businessLeadSummary.needsWebsiteHelp),
      needsManagementHelp: Boolean(input.businessLeadSummary.needsManagementHelp),
      status: 'new',
      createdAt: now,
      updatedAt: now,
      notes: input.message
    });
    businessLeadId = leadRef.id;
  }

  return { enquiryId: docRef.id, businessLeadId };
}
