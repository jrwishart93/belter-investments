import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function PortalProfilePage() {
  const { profile, updateProfileDetails } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('loading');
    try {
      await updateProfileDetails({
        fullName: String(form.get('fullName') ?? ''),
        phone: String(form.get('phone') ?? ''),
        contactPreference: String(form.get('contactPreference') ?? 'Email'),
        marketingConsent: form.get('marketingConsent') === 'on',
        marketingConsentSource: 'profile',
        address: String(form.get('address') ?? ''),
        city: String(form.get('city') ?? ''),
        postcode: String(form.get('postcode') ?? ''),
        notesVisibleToAdmin: String(form.get('notesVisibleToAdmin') ?? ''),
        companyName: String(form.get('companyName') ?? '')
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="portal-card portal-form" onSubmit={handleSubmit}>
      <p className="eyebrow">Profile</p>
      <h2>Your details</h2>
      <p>Complete profiles can be reviewed for future property alerts and promotional eligibility.</p>
      <div className="profile-progress" aria-label="Profile completion">
        <span style={{ width: profile?.profileCompleted ? '100%' : '55%' }} />
      </div>
      <p className="form-helper">
        {profile?.profileCompleted ? 'Profile completed. Promotional offer pending review where applicable.' : 'Add your name, email, and contact number to complete the core profile.'}
      </p>

      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="profile-fullName">Full Name</label>
          <input id="profile-fullName" name="fullName" defaultValue={profile?.fullName} required />
        </div>
        <div className="field-group">
          <label htmlFor="profile-email">Email Address</label>
          <input id="profile-email" value={profile?.email ?? ''} disabled />
        </div>
        <div className="field-group">
          <label htmlFor="profile-phone">Contact Number</label>
          <input id="profile-phone" name="phone" type="tel" defaultValue={profile?.phone} />
        </div>
        <div className="field-group">
          <label htmlFor="profile-contactPreference">Preferred Contact</label>
          <select id="profile-contactPreference" name="contactPreference" defaultValue={profile?.contactPreference || 'Email'}>
            <option>Email</option>
            <option>Phone</option>
            <option>Either</option>
          </select>
        </div>
        <div className="field-group">
          <label htmlFor="profile-address">Address</label>
          <input id="profile-address" name="address" defaultValue={profile?.address} />
        </div>
        <div className="field-group">
          <label htmlFor="profile-city">City</label>
          <input id="profile-city" name="city" defaultValue={profile?.city} />
        </div>
        <div className="field-group">
          <label htmlFor="profile-postcode">Postcode</label>
          <input id="profile-postcode" name="postcode" defaultValue={profile?.postcode} />
        </div>
        <div className="field-group">
          <label htmlFor="profile-companyName">Company Name</label>
          <input id="profile-companyName" name="companyName" defaultValue={profile?.companyName} />
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="profile-notes">Helpful notes for Belter</label>
        <textarea id="profile-notes" name="notesVisibleToAdmin" rows={4} defaultValue={profile?.notesVisibleToAdmin} />
      </div>
      <label className="consent-option">
        <input type="checkbox" name="marketingConsent" defaultChecked={profile?.marketingConsent} />
        <span className="consent-option__control" aria-hidden="true" />
        <span className="consent-option__copy">
          <strong>Send me future property updates</strong>
          <small>Receive relevant availability alerts, property updates, and Belter news.</small>
        </span>
      </label>
      <button className="cta-button" disabled={status === 'loading'}>{status === 'loading' ? 'Saving...' : 'Save profile'}</button>
      {status === 'success' ? <p className="success-text">Profile updated.</p> : null}
      {status === 'error' ? <p className="error-text">Unable to save profile right now.</p> : null}
    </form>
  );
}
