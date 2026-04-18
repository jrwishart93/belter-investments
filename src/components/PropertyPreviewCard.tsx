import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { ArrowRight, CalendarCheck, CheckCircle2, FileText, MapPin, MessageCircle } from 'lucide-react';
import type { PropertyListing } from '../data/property';

type PropertyPreviewCardProps = {
  property: PropertyListing;
  highlights?: string[];
  variant?: 'feature' | 'compact';
};

export function PropertyPreviewCard({ property, highlights = [], variant = 'feature' }: PropertyPreviewCardProps) {
  const image = property.images[1] ?? property.images[0];
  const slideshowImages = property.images.filter((propertyImage) => propertyImage.src);
  const isAvailable = property.status.toLowerCase().startsWith('available');
  const priceOrAvailability = property.availabilityDisplay ?? property.monthlyRentDisplay;
  const isFeature = variant === 'feature';

  return (
    <article className={`panel property-preview-card property-preview-card--${variant}`}>
      {isFeature && slideshowImages.length > 0 ? (
        <figure
          className="property-preview-card__media property-preview-card__slideshow"
          aria-label={`${property.title} image slideshow`}
        >
          {slideshowImages.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                '--slide-index': index,
                '--slide-count': slideshowImages.length
              } as CSSProperties}
              aria-hidden="true"
            />
          ))}
        </figure>
      ) : image ? (
        <img className="property-preview-card__media" src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      ) : null}
      <div className="property-preview-card__content">
        <p className="eyebrow">{property.featured ? 'Featured property' : 'Portfolio property'}</p>
        <span className={`status-tag${isAvailable ? ' status-tag--available' : ''}`}>
          <CalendarCheck size={14} strokeWidth={2} aria-hidden="true" />
          {property.status}
        </span>
        <h3>
          {isFeature ? property.title : `${property.addressLine1}, ${property.city}`}
        </h3>
        {isFeature ? (
          <p className="property-preview-card__address">
            <MapPin size={15} strokeWidth={1.9} aria-hidden="true" />
            <span>Located within 61 Caledonian Crescent, forming part of the James Square development.</span>
          </p>
        ) : null}
        <p className="hero__price">{priceOrAvailability}</p>
        <p>{property.summary}</p>

        {highlights.length > 0 ? (
          <ul className="property-preview-card__highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>
                {isFeature ? <CheckCircle2 size={16} strokeWidth={1.9} aria-hidden="true" /> : null}
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {isFeature && property.locationFacts[0] ? (
          <p className="property-preview-card__location-note">{property.locationFacts[0]}</p>
        ) : null}

        <div className="property-preview-card__actions">
          <Link className="text-link" to={`/properties/${property.slug}`}>
            <FileText className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
            <span>View Full Details</span>
            <ArrowRight className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
          </Link>
          <Link className="text-link" to="/enquiries">
            <MessageCircle className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
            <span>Enquire Now</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
