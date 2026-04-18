import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { firestoreDb } from './firebase';
import { defaultUserRole, isUserRole, type UserRole, type UserStatus } from './roles';
import type { EnquirySection } from './forms';

export type UserProfile = {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  profileCompleted: boolean;
  contactPreference: string;
  marketingConsent: boolean;
  marketingConsentAt?: unknown;
  marketingConsentSource: string;
  address: string;
  city: string;
  postcode: string;
  notesVisibleToAdmin: string;
  promoEligible: boolean;
  promoCodeAssigned: string;
  linkedEnquiryIds: string[];
  linkedPropertyIds: string[];
  companyName: string;
  tenantStatus: string;
  lastPortalLoginAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type PortalEnquiry = {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  submittedByUid: string | null;
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string[];
  message: string;
  status: 'new' | 'in_review' | 'awaiting_reply' | 'closed' | 'converted';
  accountCreated: boolean;
  businessLead: boolean;
  portfolioOpportunity: boolean;
  sections?: EnquirySection[];
};

export type IssuePayload = {
  title: string;
  description: string;
  category: 'fault' | 'damage' | 'maintenance' | 'other';
  priority: 'low' | 'normal' | 'urgent';
};

function requireDb() {
  if (!firestoreDb) {
    throw new Error('Firebase is not configured. Add the Vite Firebase environment variables first.');
  }
  return firestoreDb;
}

export function calculateProfileCompletion(profile: Pick<UserProfile, 'fullName' | 'email' | 'phone'>) {
  return Boolean(profile.fullName.trim() && profile.email.trim() && profile.phone.trim());
}

export async function getUserProfile(uid: string) {
  const db = requireDb();
  const snapshot = await getDoc(doc(db, 'users', uid));
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  const role = isUserRole(data.role) ? data.role : defaultUserRole;

  return {
    uid,
    fullName: String(data.fullName ?? ''),
    email: String(data.email ?? ''),
    phone: String(data.phone ?? ''),
    role,
    status: data.status === 'archived' || data.status === 'pending' ? data.status : 'active',
    profileCompleted: Boolean(data.profileCompleted),
    contactPreference: String(data.contactPreference ?? 'Email'),
    marketingConsent: Boolean(data.marketingConsent),
    marketingConsentAt: data.marketingConsentAt,
    marketingConsentSource: String(data.marketingConsentSource ?? ''),
    address: String(data.address ?? ''),
    city: String(data.city ?? ''),
    postcode: String(data.postcode ?? ''),
    notesVisibleToAdmin: String(data.notesVisibleToAdmin ?? ''),
    promoEligible: Boolean(data.promoEligible),
    promoCodeAssigned: String(data.promoCodeAssigned ?? ''),
    linkedEnquiryIds: Array.isArray(data.linkedEnquiryIds) ? data.linkedEnquiryIds : [],
    linkedPropertyIds: Array.isArray(data.linkedPropertyIds) ? data.linkedPropertyIds : [],
    companyName: String(data.companyName ?? ''),
    tenantStatus: String(data.tenantStatus ?? ''),
    lastPortalLoginAt: data.lastPortalLoginAt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  } satisfies UserProfile;
}

export async function createUserProfile(uid: string, values: Partial<UserProfile> & Pick<UserProfile, 'email'>) {
  const db = requireDb();
  const fullName = values.fullName ?? '';
  const phone = values.phone ?? '';
  const profileCompleted = calculateProfileCompletion({ fullName, email: values.email, phone });

  await setDoc(
    doc(db, 'users', uid),
    {
      uid,
      fullName,
      email: values.email,
      phone,
      role: values.role ?? defaultUserRole,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      profileCompleted,
      contactPreference: values.contactPreference ?? 'Email',
      marketingConsent: Boolean(values.marketingConsent),
      marketingConsentAt: values.marketingConsent ? serverTimestamp() : null,
      marketingConsentSource: values.marketingConsent ? values.marketingConsentSource ?? 'register' : '',
      address: values.address ?? '',
      city: values.city ?? '',
      postcode: values.postcode ?? '',
      notesVisibleToAdmin: values.notesVisibleToAdmin ?? '',
      status: values.status ?? 'active',
      promoEligible: profileCompleted,
      promoCodeAssigned: values.promoCodeAssigned ?? '',
      linkedEnquiryIds: values.linkedEnquiryIds ?? [],
      linkedPropertyIds: values.linkedPropertyIds ?? [],
      companyName: values.companyName ?? '',
      tenantStatus: values.tenantStatus ?? '',
      lastPortalLoginAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function updateUserProfile(uid: string, values: Partial<UserProfile>) {
  const db = requireDb();
  const current = await getUserProfile(uid);
  if (!current) {
    throw new Error('Profile not found.');
  }

  const next = { ...current, ...values };
  const profileCompleted = calculateProfileCompletion(next);

  await updateDoc(doc(db, 'users', uid), {
    ...values,
    profileCompleted,
    promoEligible: profileCompleted || current.promoEligible,
    updatedAt: serverTimestamp()
  });
}

export async function recordPortalLogin(uid: string) {
  const db = requireDb();
  await setDoc(doc(db, 'users', uid), { lastPortalLoginAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
}

export async function listMyEnquiries(uid: string) {
  const db = requireDb();
  const snapshot = await getDocs(query(collection(db, 'enquiries'), where('submittedByUid', '==', uid), orderBy('createdAt', 'desc'), limit(50)));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as PortalEnquiry[];
}

export async function listAdminEnquiries() {
  const db = requireDb();
  const snapshot = await getDocs(query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'), limit(100)));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as PortalEnquiry[];
}

export async function listAdminUsers() {
  const db = requireDb();
  const snapshot = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(100)));
  return snapshot.docs.map((item) => ({ uid: item.id, ...item.data() })) as UserProfile[];
}

export async function updateEnquiryStatus(enquiryId: string, status: PortalEnquiry['status']) {
  const db = requireDb();
  await updateDoc(doc(db, 'enquiries', enquiryId), {
    status,
    updatedAt: serverTimestamp()
  });
}

export async function updateUserAdminFields(uid: string, values: { role?: UserRole; status?: UserStatus; promoEligible?: boolean; promoCodeAssigned?: string }) {
  const db = requireDb();
  await updateDoc(doc(db, 'users', uid), {
    ...values,
    updatedAt: serverTimestamp()
  });
}

export async function createIssue(uid: string, issue: IssuePayload) {
  const db = requireDb();
  await addDoc(collection(db, 'issues'), {
    tenantUid: uid,
    propertyId: '',
    category: issue.category,
    title: issue.title,
    description: issue.description,
    priority: issue.priority,
    status: 'new',
    images: [],
    adminAssignedUid: '',
    resolutionNotes: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}
