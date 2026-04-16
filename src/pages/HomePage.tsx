import { CtaButton } from '../components/CtaButton';
import { NavigationCard } from '../components/NavigationCard';
import { PageHero } from '../components/PageHero';
import { PropertyPreviewCard } from '../components/PropertyPreviewCard';
import { Section } from '../components/Section';
import { featuredProperty } from '../data/property';

export function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Belter Investments Ltd · Edinburgh"
        title="Edinburgh property, expertly curated."
        subtitle="Long-term investment and dependable letting — quality homes across Edinburgh's most livable neighbourhoods."
        actions={
          <>
            <CtaButton to={`/property/${featuredProperty.slug}`}>View featured property</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Make an enquiry
            </CtaButton>
          </>
        }
        aside={<div className="image-block image-block--hero" role="img" aria-label="Belter Investments Edinburgh property" />}
      />

      <Section title="What we do" intro="Simple, focused services delivered with care.">
        <div className="cards-grid cards-grid--three">
          <article className="info-card">
            <h3>Property Acquisition</h3>
            <p>Well-located Edinburgh homes selected for long-term value.</p>
          </article>
          <article className="info-card">
            <h3>Renovation</h3>
            <p>Practical improvements that keep properties bright, calm, and durable.</p>
          </article>
          <article className="info-card">
            <h3>Letting</h3>
            <p>Straightforward tenancy management with clear communication.</p>
          </article>
        </div>
      </Section>

      <Section
        title="Edinburgh focus"
        intro="Rooted locally, with properties chosen for strong location and day-to-day livability."
      >
        <div className="location-feature">
          <div className="image-block image-block--location" role="img" aria-label="Canal-side walkway in Edinburgh" />
          <p>Properties in and around Edinburgh’s established neighbourhoods, with reliable access to transport and amenities.</p>
        </div>
      </Section>

      <Section title="Featured property" intro="Current listing from our portfolio.">
        <PropertyPreviewCard property={featuredProperty} />
      </Section>

      <Section title="About Belter Investments" intro="A calm, hands-on approach to property investment and letting.">
        <div className="panel">
          <p>
            We are a small Edinburgh property business focused on sensible acquisitions, good upkeep, and dependable letting. We keep
            things straightforward for tenants and manage properties to a consistent standard.
          </p>
        </div>
      </Section>

      <Section title="Explore the website" intro="Find what you need quickly.">
        <div className="cards-grid cards-grid--three">
          <NavigationCard
            title="Property Details"
            description="View the full listing profile, key features, and location details."
            to={`/property/${featuredProperty.slug}`}
          />
          <NavigationCard
            title="Enquiry Page"
            description="Send a quick message or complete a detailed rental enquiry form."
            to="/enquiry"
          />
          <NavigationCard title="About Us" description="Learn about Belter Investments and our professional approach." to="/about" />
        </div>
      </Section>

      <Section title="Enquiry" intro="If you’re interested in a property, send a quick message or complete a full enquiry form.">
        <div className="panel">
          <div className="hero__actions">
            <CtaButton to="/enquiry">Start enquiry</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Detailed form
            </CtaButton>
          </div>
        </div>
      </Section>
    </>
  );
}
