import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { mainNavigation, siteConfig } from '../data/site';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <NavLink className="brand" to="/" aria-label="Go to Belter Investments homepage" onClick={closeMenu}>
        <img className="brand__mark" src="/images/Belter-logo.png" alt="Belter Investments logo" />
        <span>
          <strong>Belter Investments</strong>
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
      </nav>
    </header>
  );
}
