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
      <div className="hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 id="page-hero-heading">{title}</h1>
        <p>{subtitle}</p>
        {actions ? <div className="hero__actions">{actions}</div> : null}
      </div>
      {aside ? <aside className="panel">{aside}</aside> : null}
    </section>
  );
}
