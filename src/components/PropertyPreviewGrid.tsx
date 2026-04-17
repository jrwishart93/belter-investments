import type { PropertyListing } from '../data/property';
import { PropertyPreviewCard } from './PropertyPreviewCard';

type PropertyPreviewGridProps = {
  properties: PropertyListing[];
  highlightsBySlug?: Partial<Record<string, string[]>>;
  variant?: 'feature' | 'compact';
};

export function PropertyPreviewGrid({ properties, highlightsBySlug = {}, variant = 'feature' }: PropertyPreviewGridProps) {
  return (
    <div className={`property-preview-grid property-preview-grid--${variant}`} role="list" aria-label="Featured properties">
      {properties.map((property) => (
        <div key={property.id} role="listitem">
          <PropertyPreviewCard property={property} highlights={highlightsBySlug[property.slug] ?? []} variant={variant} />
        </div>
      ))}
    </div>
  );
}
