import { useScrollReveal } from '../hooks/useScrollReveal';
import { CtaButton } from '../components/CtaButton';
import { NavigationCard } from '../components/NavigationCard';
import { PageHero } from '../components/PageHero';
import { PropertyPreviewCard } from '../components/PropertyPreviewCard';
import { Section } from '../components/Section';
import { featuredProperty } from '../data/property';

const featuredHighlights = [
  'Long-term let in west Edinburgh city centre setting',
  'Near Fountain Park leisure and retail destination',
  'Close to Haymarket train station and tram links',
  'Suitable for professionals or students seeking strong connectivity'
];

export function HomePage() {
  const pathwaysRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        className="hero--landing"
        eyebrow="Belter Investments"
        title="Premium long-term rental property in Edinburgh."
        subtitle="Featured Property: 61/1 Caledonian Crescent, Edinburgh"
        details={
          <>
            <p className="hero__price-block">
              <span className="hero__price">£1,655 per month</span>
            </p>
            <p className="hero__supporting">Long-term rental in a well-connected west city centre location</p>
          </>
        }
        actions={
          <>
            <CtaButton to={`/property/${featuredProperty.slug}`}>View Property Details</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Make an Enquiry
            </CtaButton>
          </>
        }
        aside={<div className="image-block image-block--hero image-block--hero-landing" role="img" aria-label="Featured flat at 61/1 Caledonian Crescent in Edinburgh" />}
      />

      <Section
        title="Family-run, professionally managed"
        intro="Belter Investments is an Edinburgh-based family business focused on high-standard, long-term residential property. We combine hands-on management with a clear, dependable service for tenants."
      >
        <div className="panel">
          <p>Our approach is intentionally focused: quality homes, careful upkeep, and clear communication throughout the tenancy journey.</p>
        </div>
      </Section>

      <Section
        title="Featured property preview"
        intro="A concise snapshot of our current highlighted home, with full details available on the property page."
      >
        <PropertyPreviewCard property={featuredProperty} highlights={featuredHighlights} />
      </Section>

      <Section title="Explore Belter Investments" intro="Use these pathways to move directly to the section you need.">
        <div ref={pathwaysRef} className="cards-grid cards-grid--three reveal">
          <NavigationCard
            className="reveal-child"
            title="Property Details"
            description="Review full specifications, gallery imagery, and location information for 61/1 Caledonian Crescent."
            to={`/property/${featuredProperty.slug}`}
          />
          <NavigationCard
            className="reveal-child"
            title="Enquiry"
            description="Contact us to discuss availability, suitability, and next steps for this long-term let."
            to="/enquiry"
          />
          <NavigationCard
            className="reveal-child"
            title="About Us"
            description="Read about our family-run background and our professional investment and letting approach."
            to="/about"
          />
        </div>
      </Section>

      <Section title="Growing portfolio" intro="Belter Investments is structured for future expansion across additional high-quality Edinburgh homes.">
        <div className="panel portfolio-placeholder">
          <p>Additional properties will be introduced here as the portfolio grows, with the same emphasis on quality, location, and long-term tenancy standards.</p>
        </div>
      </Section>
    </>
  );
}
