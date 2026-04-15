import { NavLink } from 'react-router-dom';
import { mainNavigation } from '../data/site';

export function SiteHeader() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Go to Belter Investments homepage">
        <span className="brand__mark" aria-hidden="true">
          BI
        </span>
        <span>
          <strong>Belter Investments</strong>
          <small>Edinburgh long-term rental properties</small>
        </span>
      </NavLink>

      <nav aria-label="Primary navigation" className="site-nav">
        {mainNavigation.map((item) => (
          <NavLink key={item.href} to={item.href} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
