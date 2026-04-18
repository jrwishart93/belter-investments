import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  OAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  type User
} from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from '../lib/firebase';
import {
  createUserProfile,
  getUserProfile,
  recordPortalLogin,
  updateUserProfile,
  type UserProfile
} from '../lib/firestoreHelpers';
import { defaultUserRole } from '../lib/roles';

type RegisterValues = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  marketingConsent?: boolean;
  marketingConsentSource?: string;
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  configured: boolean;
  login: (email: string, password: string) => Promise<void>;
  signInWithApple: () => Promise<void>;
  register: (values: RegisterValues) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfileDetails: (values: Partial<UserProfile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function requireAuth() {
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured yet.');
  }
  return firebaseAuth;
}

function createAppleProvider() {
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  return provider;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(nextUser: User | null) {
    if (!nextUser) {
      setProfile(null);
      return;
    }

    const existingProfile = await getUserProfile(nextUser.uid);
    if (existingProfile) {
      setProfile(existingProfile);
      await recordPortalLogin(nextUser.uid).catch(() => undefined);
      return;
    }

    await createUserProfile(nextUser.uid, {
      email: nextUser.email ?? '',
      fullName: nextUser.displayName ?? '',
      role: defaultUserRole,
      status: 'active'
    });
    setProfile(await getUserProfile(nextUser.uid));
  }

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return undefined;
    }

    void getRedirectResult(firebaseAuth).catch(() => undefined);

    return onAuthStateChanged(firebaseAuth, async (nextUser) => {
      setLoading(true);
      setUser(nextUser);
      try {
        await loadProfile(nextUser);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      configured: isFirebaseConfigured,
      async login(email: string, password: string) {
        const auth = requireAuth();
        await signInWithEmailAndPassword(auth, email, password);
      },
      async signInWithApple() {
        const auth = requireAuth();
        const provider = createAppleProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
          if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
            await signInWithRedirect(auth, provider);
            return;
          }
          throw error;
        }
      },
      async register(values: RegisterValues) {
        const auth = requireAuth();
        const credentials = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(credentials.user, { displayName: values.fullName });
        await createUserProfile(credentials.user.uid, {
          email: values.email,
          fullName: values.fullName,
          phone: values.phone ?? '',
          marketingConsent: Boolean(values.marketingConsent),
          marketingConsentSource: values.marketingConsentSource ?? 'register',
          role: defaultUserRole,
          status: 'active'
        });
        setProfile(await getUserProfile(credentials.user.uid));
        return credentials.user;
      },
      async logout() {
        const auth = requireAuth();
        await signOut(auth);
      },
      async resetPassword(email: string) {
        const auth = requireAuth();
        await sendPasswordResetEmail(auth, email);
      },
      async refreshProfile() {
        if (user) {
          setProfile(await getUserProfile(user.uid));
        }
      },
      async updateProfileDetails(values: Partial<UserProfile>) {
        if (!user) {
          throw new Error('You need to be signed in.');
        }
        await updateUserProfile(user.uid, values);
        setProfile(await getUserProfile(user.uid));
      }
    }),
    [loading, profile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
