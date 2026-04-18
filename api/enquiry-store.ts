import { getAdminServices } from './firebase-admin';

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };

export type StoreEnquiryInput = {
  authIdToken?: string;
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string[];
  message: string;
  accountCreated?: boolean;
  businessLead?: boolean;
  portfolioOpportunity?: boolean;
  sections?: EnquirySection[];
};

export async function storeEnquiry(input: StoreEnquiryInput) {
  const services = getAdminServices();
  if (!services) {
    return null;
  }

  let submittedByUid: string | null = null;
  if (input.authIdToken) {
    const token = await services.auth.verifyIdToken(input.authIdToken);
    submittedByUid = token.uid;
  }

  const now = services.FieldValue.serverTimestamp();
  const docRef = await services.db.collection('enquiries').add({
    createdAt: now,
    updatedAt: now,
    submittedByUid,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    enquiryType: input.enquiryType,
    propertyAddressOrArea: '',
    propertyType: '',
    bedrooms: '',
    ownershipStatus: '',
    letType: input.enquiryType.includes('Detailed rental enquiry') ? 'long_term' : '',
    currentlyAdvertised: '',
    advertisingPlatforms: [],
    needsWebsite: false,
    websiteGoals: [],
    investmentInterestType: '',
    timeline: '',
    goals: [],
    message: input.message,
    status: 'new',
    accountCreated: Boolean(input.accountCreated || submittedByUid),
    internalLeadScore: 0,
    assignedToUid: '',
    businessLead: Boolean(input.businessLead),
    portfolioOpportunity: Boolean(input.portfolioOpportunity),
    sections: input.sections ?? []
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

  return docRef.id;
}
