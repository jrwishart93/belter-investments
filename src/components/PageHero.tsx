import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, actions, aside }: PageHeroProps) {
  return (
    <section className="hero" aria-labelledby="page-hero-heading">
      <div className="hero__orbs" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__orb hero__orb--4" />
      </div>
      <div className="hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 id="page-hero-heading">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        {actions ? <div className="hero__actions">{actions}</div> : null}
      </div>
      {aside ? <aside className="panel">{aside}</aside> : null}
    </section>
  );
}
