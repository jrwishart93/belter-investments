import type { ReactNode } from 'react';
import { siteConfig } from '../data/site';
import { ScrollToTop } from './ScrollToTop';
import { SiteHeader } from './SiteHeader';
import { StickyCtaBar } from './StickyCtaBar';

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="page-shell">
      <ScrollToTop />
      <SiteHeader />
      <main>{children}</main>
      <footer className="site-footer">
        <p>
          {siteConfig.companyName} · Properties, Investments & Enquiries · {siteConfig.city}
        </p>
        <p>
          Contact: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> ·{' '}
          <a href={`tel:${siteConfig.contactPhone.replace(/[^+\d]/g, '')}`}>{siteConfig.contactPhone}</a>
        </p>
      </footer>
      <StickyCtaBar />
    </div>
  );
}
