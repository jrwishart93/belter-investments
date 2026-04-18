import { NavLink, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { canAccessAdmin, canAccessBusiness, canAccessTenant, roleLabel } from '../../lib/roles';

const basePortalNav = [
  { label: 'Dashboard', href: '/portal' },
  { label: 'Profile', href: '/portal/profile' },
  { label: 'Enquiries', href: '/portal/enquiries' }
];

export function PortalLayout() {
  const { logout, profile } = useAuth();
  const role = profile?.role ?? 'enquiry';
  const navItems = [
    ...basePortalNav,
    ...(canAccessTenant(role) ? [{ label: 'Tenancy', href: '/portal/tenancy' }, { label: 'Issues', href: '/portal/issues' }] : []),
    ...(canAccessBusiness(role) ? [{ label: 'Business', href: '/portal/business' }] : []),
    ...(canAccessAdmin(role) ? [{ label: 'Admin', href: '/portal/admin' }] : [])
  ];

  return (
    <section className="portal-shell">
      <div className="portal-header">
        <div>
          <p className="eyebrow">Belter Portal</p>
          <h1>Your account</h1>
          <p>{roleLabel(role)} access for enquiries, property updates, and future tenant services.</p>
        </div>
        <button className="portal-logout" type="button" onClick={() => void logout()}>
          <LogOut size={16} aria-hidden="true" />
          Sign out
        </button>
      </div>

      <div className="portal-grid">
        <aside className="portal-sidebar" aria-label="Portal navigation">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.href === '/portal'}>
              {item.label}
            </NavLink>
          ))}
        </aside>
        <div className="portal-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
