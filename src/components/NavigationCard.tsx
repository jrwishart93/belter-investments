import { Link } from 'react-router-dom';

type NavigationCardProps = {
  title: string;
  description: string;
  to: string;
  className?: string;
  ctaLabel?: string;
};

export function NavigationCard({ title, description, to, className, ctaLabel = 'Open section' }: NavigationCardProps) {
  return (
    <article className={`info-card nav-card${className ? ` ${className}` : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to} className="text-link">
        {ctaLabel}
      </Link>
    </article>
  );
}
