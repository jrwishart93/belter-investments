import { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { configured, login, signInWithApple, user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = typeof location.state === 'object' && location.state && 'from' in location.state ? String(location.state.from) : '/portal';

  if (user) {
    return <Navigate to="/portal" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('loading');
    setMessage('');
    try {
      await login(String(form.get('email') ?? ''), String(form.get('password') ?? ''));
      navigate(from, { replace: true });
    } catch {
      setMessage('Unable to sign in. Check your email and password and try again.');
      setStatus('error');
    }
  }

  async function handleAppleSignIn() {
    setStatus('loading');
    setMessage('');
    try {
      await signInWithApple();
      navigate(from, { replace: true });
    } catch {
      setMessage('Unable to continue with Apple. Check that Apple sign-in is enabled in Firebase.');
      setStatus('error');
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Belter Portal</p>
          <h1>Welcome back</h1>
          <p>Sign in to access your enquiries, profile, and property services.</p>
        </div>
        {!configured ? (
          <p className="notice-text">Firebase environment variables are needed before sign in is available.</p>
        ) : null}
        <div className="field-group">
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field-group">
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <button className="cta-button" type="submit" disabled={!configured || status === 'loading'}>
          {status === 'loading' ? 'Signing in\u2026' : 'Sign in'}
        </button>
        <div className="auth-divider"><span>or</span></div>
        <button
          className="apple-auth-button"
          type="button"
          onClick={() => void handleAppleSignIn()}
          disabled={!configured || status === 'loading'}
        >
          <span aria-hidden="true">{'\u{F8FF}'}</span>
          Continue with Apple
        </button>
        {status === 'error' ? (
          <p className="error-text" role="alert">{message}</p>
        ) : null}
        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
