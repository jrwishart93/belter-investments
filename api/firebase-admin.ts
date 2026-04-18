import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

function normalisePrivateKey(value: string) {
  return value.replace(/\\n/g, '\n');
}

function hasAdminConfig() {
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}

export function getAdminServices() {
  if (!hasAdminConfig()) {
    return null;
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalisePrivateKey(process.env.FIREBASE_PRIVATE_KEY ?? '')
      })
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
    FieldValue
  };
}
