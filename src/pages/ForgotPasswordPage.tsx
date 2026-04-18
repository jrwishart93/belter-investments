import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ForgotPasswordPage() {
  const { configured, resetPassword } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('loading');
    try {
      await resetPassword(String(form.get('email') ?? ''));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Account access</p>
        <h1>Reset password</h1>
        <p>Enter your email address and we will send a secure reset link.</p>
        {!configured ? <p className="notice-text">Firebase environment variables are needed before password reset is available.</p> : null}
        <div className="field-group">
          <label htmlFor="reset-email">Email Address</label>
          <input id="reset-email" name="email" type="email" autoComplete="email" required />
        </div>
        <button className="cta-button" type="submit" disabled={!configured || status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send reset link'}
        </button>
        {status === 'success' ? <p className="success-text" role="status">If that email is registered, a reset link has been sent.</p> : null}
        {status === 'error' ? <p className="error-text" role="alert">Unable to send a reset link right now.</p> : null}
        <p className="auth-links">
          <Link to="/login">Back to sign in</Link>
        </p>
      </form>
    </div>
  );
}
