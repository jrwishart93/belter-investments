import type { ReactNode } from 'react';
import { siteConfig } from '../data/site';
import { SiteHeader } from './SiteHeader';
import { StickyCtaBar } from './StickyCtaBar';

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>{children}</main>
      <footer className="site-footer">
        <p>
          {siteConfig.companyName} · {siteConfig.city}
        </p>
        <p>
          Contact: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </footer>
      <StickyCtaBar />
    </div>
  );
}
