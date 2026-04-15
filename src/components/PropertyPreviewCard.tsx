import { Link } from 'react-router-dom';
import type { PropertyListing } from '../data/property';

type PropertyPreviewCardProps = {
  property: PropertyListing;
};

export function PropertyPreviewCard({ property }: PropertyPreviewCardProps) {
  return (
    <article className="panel property-preview-card">
      <p className="eyebrow">Featured property</p>
      <h3>
        {property.addressLine1}, {property.city}
      </h3>
      <p className="hero__price">{property.monthlyRentDisplay}</p>
      <p>{property.summary}</p>
      <Link className="text-link" to={`/property/${property.slug}`}>
        View full property details
      </Link>
    </article>
  );
}
