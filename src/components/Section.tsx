import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
};

export function Section({ id, title, intro, tone = 'light', children }: SectionProps) {
  return (
    <section id={id} className={`section section--${tone}`} aria-labelledby={id ? `${id}-heading` : undefined}>
      <div className="section__inner">
        <header className="section__header">
          <h2 id={id ? `${id}-heading` : undefined}>{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
