import { Link } from 'react-router-dom';
import type { PropertyListing } from '../data/property';

type PropertyPreviewCardProps = {
  property: PropertyListing;
  highlights?: string[];
};

export function PropertyPreviewCard({ property, highlights = [] }: PropertyPreviewCardProps) {
  const image = property.images[1] ?? property.images[0];

  return (
    <article className="panel property-preview-card property-preview-card--feature">
      {image ? <img className="property-preview-card__media" src={image.src} alt={image.alt} /> : null}
      <div className="property-preview-card__content">
        <p className="eyebrow">Featured property</p>
        <h3>
          {property.addressLine1}, {property.city}
        </h3>
        <p className="hero__price">{property.monthlyRentDisplay}</p>
        <p>{property.summary}</p>

        {highlights.length > 0 ? (
          <ul className="property-preview-card__highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}

        <div className="property-preview-card__actions">
          <Link className="text-link" to={`/property/${property.slug}`}>
            View full property advert
          </Link>
          <Link className="text-link" to="/enquiry">
            Make an enquiry
          </Link>
        </div>
      </div>
    </article>
  );
}
