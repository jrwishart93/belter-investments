import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  brandMark?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  details?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, brandMark, title, subtitle, details, actions, aside, className }: PageHeroProps) {
  return (
    <section className={`hero${className ? ` ${className}` : ''}`} aria-labelledby="page-hero-heading">
      <div className="hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {brandMark ? <div className="hero__brand-mark">{brandMark}</div> : null}
        <h1 id="page-hero-heading">{title}</h1>
        {subtitle ? <p className="hero__subtitle">{subtitle}</p> : null}
        {details ? <div className="hero__details">{details}</div> : null}
        {actions ? <div className="hero__actions">{actions}</div> : null}
      </div>
      {aside ? <aside className="hero__aside">{aside}</aside> : null}
    </section>
  );
}
