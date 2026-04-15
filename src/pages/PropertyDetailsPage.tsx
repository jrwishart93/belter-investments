import { Navigate, useParams } from 'react-router-dom';
import { CtaButton } from '../components/CtaButton';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { propertyListings } from '../data/property';

export function PropertyDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = propertyListings.find((item) => item.slug === slug);

  if (!property) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageHero
        eyebrow="Property details"
        title={`${property.addressLine1}, ${property.city}`}
        subtitle={`${property.monthlyRentDisplay} · ${property.status}`}
        actions={
          <>
            <CtaButton to="/enquiry">Enquire Now</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Request a Viewing
            </CtaButton>
          </>
        }
      />

      <Section title="Property description" intro="A long-term rental opportunity in a strong Edinburgh location.">
        <article className="panel">
          <p>{property.description}</p>
        </article>
      </Section>

      <Section title="Key features" intro="Core highlights for prospective tenants.">
        <div className="cards-grid cards-grid--three" role="list" aria-label="Property key features">
          {property.keyFeatures.map((feature) => (
            <article className="info-card" role="listitem" key={feature}>
              <h3>{feature}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="Location"
        intro="Located west of Edinburgh city centre near Fountain Park and Haymarket, with convenient access for commuting and study."
      >
        <div className="details-grid details-grid--single">
          {property.locationFacts.map((fact) => (
            <article className="panel" key={fact}>
              <p>{fact}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Next step" intro="If this property matches your requirements, we welcome your enquiry.">
        <div className="panel">
          <div className="hero__actions">
            <CtaButton to="/enquiry">Enquire Now</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Request a Viewing
            </CtaButton>
          </div>
        </div>
      </Section>
    </>
  );
}
