export type QuickMessagePayload = {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  authIdToken?: string;
  accountCreated?: boolean;
};

export type EnquiryField = {
  label: string;
  value: string;
};

export type EnquirySection = {
  title: string;
  fields: EnquiryField[];
};

export type DetailedEnquiryPayload = {
  fullName: string;
  email: string;
  contactNumber: string;
  sections: EnquirySection[];
  authIdToken?: string;
  accountCreated?: boolean;
};

export type InvestmentEnquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  serviceInterest: string[];
  propertyOwnership: string;
  propertyAddressOrArea: string;
  propertyType: string;
  bedrooms: string;
  occupied: string;
  letType: string;
  shortTermOperated: string;
  shortTermLicenceStatus: string;
  platforms: string[];
  currentlyRented: string;
  managementType: string;
  advertisingHelp: string;
  advertisedWhere: string[];
  websiteHelp: string;
  websiteGoals: string[];
  investmentInterest: string;
  estimatedValue: string;
  timeline: string;
  goals: string[];
  message: string;
  moveForward: string;
  sections: EnquirySection[];
};

type FormPath = '/api/quick-message' | '/api/detailed-enquiry' | '/api/investment-enquiry';
type FormPayload = QuickMessagePayload | DetailedEnquiryPayload | InvestmentEnquiryPayload;

async function postForm(path: FormPath, payload: FormPayload) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = response.status === 400 && typeof errorBody?.message === 'string' ? errorBody.message : 'Unable to send form right now.';
    throw new Error(message);
  }

  return response.json() as Promise<{ ok: true; enquiryId: string; businessLeadId?: string | null; emailSent: boolean }>;
}

export function submitQuickMessage(payload: QuickMessagePayload) {
  return postForm('/api/quick-message', payload);
}

export function submitDetailedEnquiry(payload: DetailedEnquiryPayload) {
  return postForm('/api/detailed-enquiry', payload);
}

export function submitInvestmentEnquiry(payload: InvestmentEnquiryPayload) {
  return postForm('/api/investment-enquiry', payload);
}
