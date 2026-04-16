import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

type SectionProps = {
  id?: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
};

export function Section({ id, title, intro, tone = 'light', children }: SectionProps) {
  const headerRef = useScrollReveal<HTMLElement>();

  return (
    <section id={id} className={`section section--${tone}`} aria-labelledby={id ? `${id}-heading` : undefined}>
      <div className="section__inner">
        <header ref={headerRef} className="section__header reveal">
          <h2 id={id ? `${id}-heading` : undefined}>{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
