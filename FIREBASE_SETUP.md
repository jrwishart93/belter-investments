# Firebase Setup

This project is wired for Firebase Auth and Cloud Firestore, but real Firebase keys are not committed.

## 1. Create the Firebase project

1. Open Firebase Console.
2. Create a project for Belter.
3. Add a web app.
4. Copy the web app config into `.env.local` using the `VITE_FIREBASE_*` keys from `.env.example`.

## 2. Enable authentication

1. Go to Authentication.
2. Enable Email/Password sign-in.
3. Enable Apple if you want Sign in with Apple.
4. For Apple web sign-in, configure this Firebase callback URL in Apple/Firebase provider setup:

   ```txt
   https://belter-64a06.firebaseapp.com/__/auth/handler
   ```

5. Register your first account through `/register`.

## 3. Create Firestore

1. Go to Firestore Database.
2. Create the default database.
3. Start with locked/production mode.
4. Deploy or paste the rules from `firestore.rules`.

## 4. Add server credentials

1. Go to Project Settings > Service accounts.
2. Generate a private key.
3. Add these values to local and deployment environment variables:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

If the private key contains line breaks, store it with escaped `\n` characters. The API helper normalises it at runtime.

## 5. Seed the first admin

After registering the first account:

1. Open Firestore.
2. Find `users/{yourUid}`.
3. Set `role` to `admin`.

After that, the portal admin area can be used as the basis for role and enquiry review workflows.

## Notes

- Guest enquiries are written through `/api/quick-message` and `/api/detailed-enquiry`.
- The API routes also keep the existing Resend email notifications.
- Do not store bank details, card details, or direct debit details in Firestore.
