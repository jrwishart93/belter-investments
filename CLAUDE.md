# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server on port 4173
npm run build      # tsc (frontend) + tsc -p tsconfig.api.json (api) + vite build
npm run preview    # preview production build
npx tsc --noEmit   # type-check frontend only
npx tsc -p tsconfig.api.json --noEmit  # type-check API routes only
```

There are no tests. Type-checking (`tsc --noEmit`) is the primary correctness gate.

## Architecture

**Two separate TypeScript compilation targets:**

- `src/` — React frontend, compiled by Vite with `tsconfig.json` (`moduleResolution: Bundler`, `noEmit: true`). Runs in the browser.
- `api/` — Vercel serverless functions, compiled with `tsconfig.api.json` (`types: ["node"]`). These are plain async `handler(req, res)` exports with no framework. Imports must use `.js` extensions (e.g. `./resend.js`) even though the files are `.ts` — Vercel resolves this at deploy time.

**Deployment:** Vercel. `vercel.json` rewrites all routes to `/index.html` for SPA routing. API routes are auto-detected from the `api/` directory.

**Frontend routing:** React Router v6, all routes defined in `src/App.tsx`. The portal (`/portal/*`) is nested under a `ProtectedRoute` that requires Firebase auth.

## Data flow for enquiry forms

1. User fills a multi-step wizard (Quick Message / Detailed Rental / Investment Enquiry).
2. On submit, `src/lib/forms.ts` POSTs to the matching `/api/*` handler.
3. The API handler:
   - Validates and normalises inputs
   - Calls `storeEnquiry()` in `api/enquiry-store.ts` → writes to Firestore `enquiries` collection (and optionally `businessLeads`)
   - Calls `sendWithResend()` in `api/resend.ts` → sends notification to `BELTER_ENQUIRY_TO` and a confirmation to the submitter's email
4. If the user opted in to account creation, the frontend calls `register()` from `AuthContext` first, gets an `idToken`, and passes it in the payload — `storeEnquiry()` verifies it and links the enquiry to the user's Firestore document.

**Firestore is required** — missing Firebase Admin env vars cause a 500 error, not a silent skip.

## Firebase

- **Client SDK** (`src/lib/firebase.ts`): initialised from `VITE_FIREBASE_*` env vars. Returns `null` if unconfigured — all consumers check `isFirebaseConfigured()`.
- **Admin SDK** (`api/firebase-admin.ts`): initialised from `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`. `FIREBASE_PRIVATE_KEY` may contain literal `\n` that must be unescaped — the helper does this automatically.
- **Auth**: Email/password + Apple (popup on mobile, redirect on desktop). `AuthContext` (`src/context/AuthContext.tsx`) wraps the full auth lifecycle including profile syncing from Firestore.
- **Roles**: `enquiry` (default on register), `staff`, `admin`. Set manually in Firestore `users/{uid}.role`. Portal page visibility is gated by role via `src/lib/roles.ts`.

## Email (Resend)

All email is sent through `api/resend.ts`. The `sendWithResend()` function accepts an optional `to` override — omit it to send to `BELTER_ENQUIRY_TO` (the business inbox), or supply a user email for confirmation messages.

Required env vars: `RESEND_API_KEY`, `BELTER_ENQUIRY_TO`, `BELTER_FROM_EMAIL`.

## Styling

All styles are in `src/index.css` — a single ~2700-line vanilla CSS file. No Tailwind, no CSS modules. Uses CSS custom properties for theming; dark mode via `@media (prefers-color-scheme: dark)`. Key naming conventions:

- Layout: `.auth-shell`, `.portal-shell`, `.cards-grid`, `.details-grid`
- Forms: `.enquiry-form`, `.field-group`, `.choice-grid`, `.choice-option`, `.conditional-panel`
- Wizard: `.wizard-container`, `.wizard-step[data-direction]`, `.wizard-nav`, `.wizard-progress`, `.wizard-review`
- Animations: `@keyframes fadeSlideUp` (conditional panels), `@keyframes slideInFromRight/Left` (wizard steps)

The wizard step animation is triggered by changing the React `key` on `.wizard-step`, which forces a remount and restarts the CSS animation. `data-direction="forward|back"` selects which keyframe runs.

## Multi-step form system

- `src/hooks/useMultiStepForm.ts` — manages `currentStep`, `direction`, `isReviewing`, `fromReview`, `stepError`, `progress`. Accepts a `validators` array (one per step, returns error string or `''`).
- `src/components/MultiStepFormWrapper.tsx` — renders the animated step container, Back/Next/Submit nav, and progress bar. Also exports `WizardReviewScreen` which renders `EnquirySection[]` cards with per-section Edit buttons.
- Validators are defined with `useMemo` in each form component, closing over current form state.
- `fromReview` mode: when a user edits a step from the review screen, `goNext()` skips to review instead of advancing to the next step.

## Portal

`/portal` is a nested route layout (`src/components/portal/PortalLayout.tsx`) with sub-pages for dashboard, profile, enquiries, tenancy, issues, business, and admin. All portal pages read from Firestore via `src/lib/firestoreHelpers.ts`. Admin-only pages are guarded client-side by role check.

## Content / data

Static content (property listings, homepage copy) lives in `src/data/`. Property slugs defined there must match the `:slug` route param used in `src/pages/PropertyDetailsPage.tsx`.

## Environment variables

See `.env.example`. Public vars must be prefixed `VITE_` to be available in the browser. The Vite config also allows `NEXT_PUBLIC_` prefix. API-only vars (Firebase Admin, Resend) must never be prefixed with `VITE_`.
