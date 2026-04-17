import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, FileText, MessageCircle } from 'lucide-react';
import type { PropertyListing } from '../data/property';

type PropertyPreviewCardProps = {
  property: PropertyListing;
  highlights?: string[];
  variant?: 'feature' | 'compact';
};

export function PropertyPreviewCard({ property, highlights = [], variant = 'feature' }: PropertyPreviewCardProps) {
  const image = property.images[1] ?? property.images[0];
  const isAvailable = property.status.toLowerCase().startsWith('available');
  const priceOrAvailability = property.availabilityDisplay ?? property.monthlyRentDisplay;

  return (
    <article className={`panel property-preview-card property-preview-card--${variant}`}>
      {image ? <img className="property-preview-card__media" src={image.src} alt={image.alt} /> : null}
      <div className="property-preview-card__content">
        <p className="eyebrow">{property.featured ? 'Featured property' : 'Portfolio property'}</p>
        <span className={`status-tag${isAvailable ? ' status-tag--available' : ''}`}>
          <CalendarCheck size={14} strokeWidth={2} aria-hidden="true" />
          {property.status}
        </span>
        <h3>
          {property.addressLine1}, {property.city}
        </h3>
        <p className="hero__price">{priceOrAvailability}</p>
        <p>{property.summary}</p>

        {highlights.length > 0 ? (
          <ul className="property-preview-card__highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}

        <div className="property-preview-card__actions">
          <Link className="text-link" to={`/properties/${property.slug}`}>
            <FileText className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
            <span>View property details</span>
            <ArrowRight className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
          </Link>
          <Link className="text-link" to="/enquiries">
            <MessageCircle className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
            <span>Make an enquiry</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
