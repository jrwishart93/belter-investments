import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { mainNavigation, siteConfig } from '../data/site';
import { useAuth } from '../context/AuthContext';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <NavLink className="brand" to="/" aria-label="Go to Belter homepage" onClick={closeMenu}>
        <img
          className="brand__logo"
          src="/images/logo/belter-wordmark-transparent.png"
          alt=""
          width="776"
          height="312"
          aria-hidden="true"
        />
        <span className="brand__copy">
          <small>{siteConfig.tagline}</small>
        </span>
      </NavLink>

      <button
        type="button"
        className="menu-toggle"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
      >
        {mainNavigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            {item.label}
          </NavLink>
        ))}
        {!user ? (
          <NavLink to="/login" onClick={closeMenu} className="nav-auth-link">
            Sign In
          </NavLink>
        ) : null}
      </nav>
    </header>
  );
}
