export type QuickMessagePayload = {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
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
};

async function postForm(path: '/api/quick-message' | '/api/detailed-enquiry', payload: QuickMessagePayload | DetailedEnquiryPayload) {
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
}

export function submitQuickMessage(payload: QuickMessagePayload) {
  return postForm('/api/quick-message', payload);
}

export function submitDetailedEnquiry(payload: DetailedEnquiryPayload) {
  return postForm('/api/detailed-enquiry', payload);
}
