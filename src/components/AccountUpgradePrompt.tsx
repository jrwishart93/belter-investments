import { Link } from 'react-router-dom';

type AccountUpgradePromptProps = {
  id: string;
  email: string;
  checked: boolean;
  password: string;
  onCheckedChange: (checked: boolean) => void;
  onPasswordChange: (password: string) => void;
  disabled: boolean;
  signedIn: boolean;
};

function usernameFromEmail(email: string): string {
  const prefix = email.split('@')[0] ?? '';
  return prefix.replace(/[^a-z0-9._-]/gi, '').toLowerCase() || 'your-email';
}

export function AccountUpgradePrompt({
  id,
  email,
  checked,
  password,
  onCheckedChange,
  onPasswordChange,
  disabled,
  signedIn,
}: AccountUpgradePromptProps) {
  if (signedIn) {
    return (
      <div className="account-upgrade-box">
        <div className="account-upgrade-box__inner">
          <p className="eyebrow">Signed in</p>
          <h3>This enquiry will be saved to your portal account.</h3>
          <p>You can track the status and update your details any time from the portal.</p>
        </div>
      </div>
    );
  }

  const username = usernameFromEmail(email);

  return (
    <div className="account-upgrade-box">
      <div className="account-upgrade-box__inner">
        <p className="eyebrow">Optional</p>
        <h3>Save your details &amp; create a free account</h3>
        <p>
          Create a Belter account and your enquiry, contact details, and any future updates will be saved in one
          place — making it easy to stay in touch. Or just submit as a guest, no account needed.
        </p>

        <div className="account-upgrade-options">
          <label className="account-upgrade-option">
            <input
              type="radio"
              name={`${id}-choice`}
              checked={!checked}
              onChange={() => onCheckedChange(false)}
            />
            <span className="account-upgrade-option__title">Submit as guest</span>
            <span className="account-upgrade-option__desc">We&apos;ll send a confirmation to your email.</span>
          </label>

          <label className={`account-upgrade-option${disabled ? ' account-upgrade-option--disabled' : ''}`}>
            <input
              type="radio"
              name={`${id}-choice`}
              checked={checked}
              onChange={() => onCheckedChange(true)}
              disabled={disabled}
            />
            <span className="account-upgrade-option__title">Create account &amp; save</span>
            <span className="account-upgrade-option__desc">
              Your username will be <strong>{username}</strong>
            </span>
          </label>
        </div>

        {checked && (
          <div className="field-group account-upgrade-password">
            <label htmlFor={id}>
              Password <span aria-hidden="true">*</span>
            </label>
            <input
              id={id}
              type="password"
              value={password}
              minLength={8}
              onChange={(e) => onPasswordChange(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 8 characters"
            />
            <p className="form-helper">You can reset this at any time from the portal.</p>
          </div>
        )}

        <p className="form-helper">
          Already have an account?{' '}
          <Link to="/login">Sign in before submitting</Link>.
        </p>
      </div>
    </div>
  );
}
