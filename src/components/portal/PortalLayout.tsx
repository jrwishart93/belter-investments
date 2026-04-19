import { NavLink, Outlet } from 'react-router-dom';
import { AlertCircle, Building2, ClipboardList, Home, LayoutDashboard, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { canAccessAdmin, canAccessBusiness, canAccessTenant, roleLabel } from '../../lib/roles';

type NavItem = { label: string; href: string; icon: LucideIcon };

const basePortalNav: NavItem[] = [
  { label: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { label: 'Profile', href: '/portal/profile', icon: UserRound },
  { label: 'Enquiries', href: '/portal/enquiries', icon: ClipboardList },
];

export function PortalLayout() {
  const { logout, profile } = useAuth();
  const role = profile?.role ?? 'enquiry';

  const navItems: NavItem[] = [
    ...basePortalNav,
    ...(canAccessTenant(role)
      ? [
          { label: 'Tenancy', href: '/portal/tenancy', icon: Home },
          { label: 'Issues', href: '/portal/issues', icon: AlertCircle },
        ]
      : []),
    ...(canAccessBusiness(role) ? [{ label: 'Business', href: '/portal/business', icon: Building2 }] : []),
    ...(canAccessAdmin(role) ? [{ label: 'Admin', href: '/portal/admin', icon: ShieldCheck }] : []),
  ];

  const displayName = profile?.fullName || profile?.email || 'Account';

  return (
    <section className="portal-shell">
      <div className="portal-topbar">
        <div className="portal-topbar__brand">
          <span className="portal-topbar__logo">B</span>
          <span className="portal-topbar__name">Belter Portal</span>
        </div>
        <div className="portal-topbar__right">
          <span className="role-badge">{roleLabel(role)}</span>
          <span className="portal-topbar__user">{displayName}</span>
          <button className="portal-logout" type="button" onClick={() => void logout()}>
            <LogOut size={14} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>

      <div className="portal-grid">
        <aside className="portal-sidebar" aria-label="Portal navigation">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.href === '/portal'}>
              <item.icon size={16} aria-hidden="true" />
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
