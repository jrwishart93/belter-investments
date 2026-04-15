import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type CtaButtonProps = {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
};

export function CtaButton({ to, children, variant = 'primary', ariaLabel }: CtaButtonProps) {
  return (
    <Link className={`cta-button ${variant === 'secondary' ? 'cta-button--secondary' : ''}`} to={to} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
