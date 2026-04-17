import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  details?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, subtitle, details, actions, aside, className }: PageHeroProps) {
  return (
    <section className={`hero${className ? ` ${className}` : ''}`} aria-labelledby="page-hero-heading">
      <div className="hero__orbs" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__orb hero__orb--4" />
      </div>
      <div className="hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 id="page-hero-heading">{title}</h1>
        {subtitle ? <p className="hero__subtitle">{subtitle}</p> : null}
        {details ? <div className="hero__details">{details}</div> : null}
        {actions ? <div className="hero__actions">{actions}</div> : null}
      </div>
      {aside ? <aside className="panel">{aside}</aside> : null}
    </section>
  );
}
