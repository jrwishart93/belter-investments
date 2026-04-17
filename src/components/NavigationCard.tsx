import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, MessageCircle } from 'lucide-react';

type NavigationCardProps = {
  title: string;
  brand?: string;
  sectionLabel?: string;
  description: string;
  to: string;
  className?: string;
  ctaLabel?: string;
};

export function NavigationCard({
  title,
  brand,
  sectionLabel,
  description,
  to,
  className,
  ctaLabel = 'Open section'
}: NavigationCardProps) {
  const Icon = to.startsWith('/properties')
    ? Building2
    : to.startsWith('/enquiries')
      ? MessageCircle
      : Landmark;

  return (
    <article className={`info-card nav-card${className ? ` ${className}` : ''}`}>
      <span className="nav-card__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      {brand && sectionLabel ? (
        <h3 className="nav-card__brand-title" aria-label={`${brand} ${sectionLabel}`}>
          <img
            className="nav-card__brand-logo"
            src="/images/logo/belter-wordmark-transparent.png"
            alt=""
            width="776"
            height="312"
            aria-hidden="true"
          />
          <span>{sectionLabel}</span>
        </h3>
      ) : (
        <h3>{title}</h3>
      )}
      <p>{description}</p>
      <Link to={to} className="text-link">
        <span>{ctaLabel}</span>
        <ArrowRight className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
      </Link>
    </article>
  );
}
