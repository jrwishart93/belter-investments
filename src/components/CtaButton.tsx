import type { ReactNode } from 'react';

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
};

export function CtaButton({ href, children, variant = 'primary', ariaLabel }: CtaButtonProps) {
  return (
    <a className={`cta-button ${variant === 'secondary' ? 'cta-button--secondary' : ''}`} href={href} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
