import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const { configured, register, signInWithApple, user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/portal" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') ?? '');
    const confirmPassword = String(form.get('confirmPassword') ?? '');
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      await register({
        fullName: String(form.get('fullName') ?? ''),
        email: String(form.get('email') ?? ''),
        phone: String(form.get('phone') ?? ''),
        password,
        marketingConsent: form.get('marketingConsent') === 'on'
      });
      navigate('/portal', { replace: true });
    } catch {
      setStatus('error');
      setMessage('Unable to create the account right now. Please try again.');
    }
  }

  async function handleAppleSignIn() {
    setStatus('loading');
    setMessage('');
    try {
      await signInWithApple();
      navigate('/portal', { replace: true });
    } catch {
      setStatus('error');
      setMessage('Unable to continue with Apple. Check that Apple sign-in is enabled in Firebase.');
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Belter Portal</p>
        <h1>Create an account</h1>
        <p>Save your enquiry, track updates, and keep your details ready for future property opportunities.</p>
        <div className="promo-callout">
          Complete your profile and, if you go on to rent through Belter, you may qualify for £100 off your first month&apos;s rent subject to approval and tenancy terms.
        </div>
        {!configured ? <p className="notice-text">Firebase environment variables are needed before registration is available.</p> : null}
        <div className="field-group">
          <label htmlFor="register-fullName">Full Name</label>
          <input id="register-fullName" name="fullName" type="text" autoComplete="name" required />
        </div>
        <div className="field-group">
          <label htmlFor="register-email">Email Address</label>
          <input id="register-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field-group">
          <label htmlFor="register-phone">Contact Number</label>
          <input id="register-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field-group">
          <label htmlFor="register-password">Password</label>
          <input id="register-password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </div>
        <div className="field-group">
          <label htmlFor="register-confirmPassword">Confirm Password</label>
          <input id="register-confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} />
        </div>
        <label className="choice-option choice-option--single">
          <input type="checkbox" name="marketingConsent" />
          <span>Send me relevant property updates and availability alerts.</span>
        </label>
        <button className="cta-button" type="submit" disabled={!configured || status === 'loading'}>
          {status === 'loading' ? 'Creating account...' : 'Create account'}
        </button>
        <div className="auth-divider"><span>or</span></div>
        <button className="apple-auth-button" type="button" onClick={() => void handleAppleSignIn()} disabled={!configured || status === 'loading'}>
          <span aria-hidden="true"></span>
          Continue with Apple
        </button>
        {status === 'error' ? <p className="error-text" role="alert">{message}</p> : null}
        <p className="auth-links">
          <Link to="/login">Already have an account?</Link>
        </p>
      </form>
    </div>
  );
}
