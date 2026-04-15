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
        eyebrow="Belter Investments · Edinburgh"
        title="Professional long-term rentals, managed with clarity and care"
        subtitle="Featured Property: 61/1 Caledonian Crescent, Edinburgh · £1,655 per month"
        actions={
          <>
            <CtaButton to={`/property/${featuredProperty.slug}`}>View Property Details</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Make an Enquiry
            </CtaButton>
          </>
        }
        aside={
          <>
            <h2>Featured Property</h2>
            <p>
              <strong>{featuredProperty.addressLine1}</strong>
              <br />
              {featuredProperty.monthlyRentDisplay}
            </p>
            <p>{featuredProperty.status}</p>
          </>
        }
      />

      <Section
        title="A family-run property business"
        intro="Belter Investments is a professional, family-run business focused on well-presented long-term rental homes in Edinburgh."
      >
        <p>
          We provide a clear and reliable rental experience for tenants and maintain high standards across management, communication and
          presentation.
        </p>
      </Section>

      <Section
        title="Featured property preview"
        intro="A concise overview of our current listing, with full details available on the dedicated property page."
      >
        <PropertyPreviewCard property={featuredProperty} />
      </Section>

      <Section title="Explore the website" intro="Use these pathways to move directly to the information you need.">
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

      <Section title="Future portfolio" intro="This section is intentionally lightweight and ready to grow as more properties are added.">
        <div className="panel">
          <h3>Portfolio expansion placeholder</h3>
          <p>Future categories can include Other Properties, Available Soon, and wider portfolio updates.</p>
        </div>
      </Section>
    </>
  );
}
