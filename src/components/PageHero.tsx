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
      <div className="hero__content reveal reveal--visible">
        {eyebrow ? <p className="eyebrow reveal-child">{eyebrow}</p> : null}
        <h1 id="page-hero-heading" className="reveal-child">{title}</h1>
        <p className="hero__subtitle reveal-child">{subtitle}</p>
        {actions ? <div className="hero__actions reveal-child">{actions}</div> : null}
      </div>
      {aside ? <aside className="hero__media reveal reveal--visible">{aside}</aside> : null}
    </section>
  );
}
