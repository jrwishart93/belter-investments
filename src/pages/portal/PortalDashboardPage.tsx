import { Link } from 'react-router-dom';
import { Building2, ClipboardList, Home, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { roleLabel } from '../../lib/roles';

export function PortalDashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="portal-stack">
      <div className="portal-card portal-card--hero">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>{profile?.fullName || 'Your Belter account'}</h2>
          <p>
            {roleLabel(profile?.role)} account for saved enquiries, profile details, and future Belter portal services.
          </p>
        </div>
        <span className="role-badge">{roleLabel(profile?.role)}</span>
      </div>

      <div className="portal-card-grid">
        <Link className="portal-action-card" to="/portal/profile">
          <UserRound aria-hidden="true" />
          <h3>Profile</h3>
          <p>Keep your contact details and preferences up to date.</p>
        </Link>
        <Link className="portal-action-card" to="/portal/enquiries">
          <ClipboardList aria-hidden="true" />
          <h3>Enquiries</h3>
          <p>Review submitted enquiries and status updates.</p>
        </Link>
        <Link className="portal-action-card" to="/portal/tenancy">
          <Home aria-hidden="true" />
          <h3>Tenant area</h3>
          <p>Future tenancy documents, payment setup status, and notices.</p>
        </Link>
        <Link className="portal-action-card" to="/portal/business">
          <Building2 aria-hidden="true" />
          <h3>Business</h3>
          <p>Track property management or business service enquiries.</p>
        </Link>
      </div>
    </div>
  );
}
