import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isStaffRole, type UserRole } from '../../lib/roles';

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: UserRole[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { configured, loading, profile, user } = useAuth();

  if (!configured) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <p className="eyebrow">Firebase setup required</p>
          <h1>Portal setup is ready</h1>
          <p>Add the Firebase environment variables to enable login, registration, and protected portal access.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="portal-loading" role="status">
        Loading account...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role) && !isStaffRole(profile.role)) {
    return <Navigate to="/portal" replace />;
  }

  return children;
}
