export type QuickMessagePayload = {
  name: string;
  email: string;
  message: string;
};

export type DetailedEnquiryPayload = {
  fullName: string;
  email: string;
  contactNumber: string;
  rentalPeriod: string;
  employed: 'Yes' | 'No';
  student: 'Yes' | 'No';
  occupants: string;
  pets: 'Yes' | 'No';
  petsNotes?: string;
  smoking: 'Yes' | 'No';
  locationStatus: string;
  viewingPreference: 'In-person viewing' | 'Virtual viewing';
  viewingInformation?: string;
  moveInDate: string;
  references: 'Yes' | 'No';
  furtherQuestions?: string;
  leadSource: string;
  leadSourceOther?: string;
};

async function postForm(path: '/api/quick-message' | '/api/detailed-enquiry', payload: QuickMessagePayload | DetailedEnquiryPayload) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Unable to send form right now.');
  }
}

export function submitQuickMessage(payload: QuickMessagePayload) {
  return postForm('/api/quick-message', payload);
}

export function submitDetailedEnquiry(payload: DetailedEnquiryPayload) {
  return postForm('/api/detailed-enquiry', payload);
}
