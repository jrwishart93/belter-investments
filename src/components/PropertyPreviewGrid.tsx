import type { PropertyListing } from '../data/property';
import { PropertyPreviewCard } from './PropertyPreviewCard';

type PropertyPreviewGridProps = {
  properties: PropertyListing[];
  highlightsBySlug?: Partial<Record<string, string[]>>;
};

export function PropertyPreviewGrid({ properties, highlightsBySlug = {} }: PropertyPreviewGridProps) {
  return (
    <div className="property-preview-grid" role="list" aria-label="Featured properties">
      {properties.map((property) => (
        <div key={property.id} role="listitem">
          <PropertyPreviewCard property={property} highlights={highlightsBySlug[property.slug] ?? []} />
        </div>
      ))}
    </div>
  );
}
