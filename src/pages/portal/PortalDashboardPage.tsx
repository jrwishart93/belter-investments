import { Link } from 'react-router-dom';
import { Building2, ClipboardList, Home, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { roleLabel } from '../../lib/roles';

function timeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function PortalDashboardPage() {
  const { profile } = useAuth();

  const isComplete = profile?.profileCompleted ?? false;

  return (
    <div className="portal-stack">
      <div className="portal-greeting">
        <p className="eyebrow">{timeGreeting()}</p>
        <h2 className="portal-greeting__name">{profile?.fullName || 'Your Belter account'}</h2>
        <div className="portal-greeting__meta">
          <span className="role-badge">{roleLabel(profile?.role)}</span>
          {profile && !isComplete && (
            <Link className="portal-nudge" to="/portal/profile">
              Complete your profile to unlock features &rarr;
            </Link>
          )}
        </div>
        {profile && (
          <div className="portal-completion">
            <div className="portal-completion__bar">
              <span style={{ width: isComplete ? '100%' : '55%' }} />
            </div>
            <p className="portal-completion__label">
              {isComplete
                ? 'Profile complete — promotional eligibility will be reviewed where applicable.'
                : 'Profile 55% complete — add your name, email and phone number to finish.'}
            </p>
          </div>
        )}
      </div>

      <div className="portal-card-grid">
        <Link className="portal-action-card" to="/portal/profile">
          <div className="portal-action-card__icon">
            <UserRound size={18} aria-hidden="true" />
          </div>
          <h3>Profile</h3>
          <p>Manage your contact details and preferences.</p>
        </Link>
        <Link className="portal-action-card" to="/portal/enquiries">
          <div className="portal-action-card__icon">
            <ClipboardList size={18} aria-hidden="true" />
          </div>
          <h3>Enquiries</h3>
          <p>View and track your submitted enquiries.</p>
        </Link>
        <Link className="portal-action-card" to="/portal/tenancy">
          <div className="portal-action-card__icon">
            <Home size={18} aria-hidden="true" />
          </div>
          <h3>Tenant area</h3>
          <p>Tenancy documents, payment status, and notices.</p>
        </Link>
        <Link className="portal-action-card" to="/portal/business">
          <div className="portal-action-card__icon">
            <Building2 size={18} aria-hidden="true" />
          </div>
          <h3>Business</h3>
          <p>Property management and business service enquiries.</p>
        </Link>
      </div>
    </div>
  );
}
