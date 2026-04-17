import { CtaButton } from '../components/CtaButton';
import { PageHero } from '../components/PageHero';
import { PropertyPreviewGrid } from '../components/PropertyPreviewGrid';
import { Section } from '../components/Section';
import { featuredHighlights } from '../data/homepage';
import { featuredProperty, propertyListings } from '../data/property';

const portfolioProperties = propertyListings.filter((property) => !property.featured);
const portfolioHighlights = Object.fromEntries(
  portfolioProperties.map((property) => [
    property.slug,
    property.keyFeatures.slice(0, 4)
  ])
);

export function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Belter Properties"
        className="hero--properties"
        title={
          <>
            <span className="hero-title-line">Edinburgh homes.</span>
            <span className="hero-title-line hero-title-line--accent">Done properly.</span>
          </>
        }
        subtitle="Browse available properties in the Belter portfolio, each with a clear status and direct enquiry route."
        actions={
          <>
            <CtaButton to="/properties#available-now">View Properties</CtaButton>
            <CtaButton to="/enquiries" variant="secondary">
              Make an Enquiry
            </CtaButton>
          </>
        }
        aside={
          <div
            className="image-block image-block--hero image-block--hero-landing"
            role="img"
            aria-label="Featured Belter Properties listing in Edinburgh"
          />
        }
      />

      <Section
        id="available-now"
        title="Available now"
        intro="The current featured listing from Belter Properties, with full details, gallery imagery, and enquiry options."
      >
        <PropertyPreviewGrid
          properties={[featuredProperty]}
          highlightsBySlug={{
            [featuredProperty.slug]: featuredHighlights
          }}
        />
      </Section>

      <Section
        title="Portfolio properties"
        intro="Other Edinburgh homes in the Belter Properties portfolio, shown with clear availability status."
      >
        <PropertyPreviewGrid properties={portfolioProperties} highlightsBySlug={portfolioHighlights} variant="compact" />
      </Section>
    </>
  );
}
