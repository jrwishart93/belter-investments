import { useScrollReveal } from '../hooks/useScrollReveal';
import { CtaButton } from '../components/CtaButton';
import { NavigationCard } from '../components/NavigationCard';
import { PageHero } from '../components/PageHero';
import { PropertyPreviewGrid } from '../components/PropertyPreviewGrid';
import { Section } from '../components/Section';
import { featuredProperty } from '../data/property';
import { featuredHighlights, getHomePathways, portfolioPlaceholders } from '../data/homepage';
import { brandPositioning, siteConfig } from '../data/site';

const homePathways = getHomePathways(featuredProperty);

export function HomePage() {
  const pathwaysRef = useScrollReveal<HTMLDivElement>();
  const trustRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        className="hero--landing"
        eyebrow={siteConfig.companyName}
        title="Professional long-term rental property in Edinburgh."
        subtitle={`Featured property: ${featuredProperty.addressLine1}, ${featuredProperty.city}`}
        details={
          <>
            <p className="hero__price-block">
              <span className="hero__price">{featuredProperty.monthlyRentDisplay}</span>
            </p>
            <p className="hero__supporting">Well-presented home with strong city connectivity and resident leisure access.</p>
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

      <Section title="Trusted local approach" intro={brandPositioning.shortStatement}>
        <div ref={trustRef} className="details-grid reveal">
          <article className="panel reveal-child">
            <p>{brandPositioning.supportingStatement}</p>
          </article>
          <article className="panel reveal-child">
            <ul className="brand-pillars" aria-label="Belter Investments brand pillars">
              {brandPositioning.pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        title="Featured property"
        intro="A concise snapshot of our current highlighted home. Open the full advert for complete details and next steps."
      >
        <PropertyPreviewGrid
          properties={[featuredProperty]}
          highlightsBySlug={{
            [featuredProperty.slug]: featuredHighlights
          }}
        />
      </Section>

      <Section
        title="Choose your next step"
        intro="We keep the journey simple: review the property, submit an enquiry, or learn more about Belter Investments."
      >
        <div ref={pathwaysRef} className="cards-grid cards-grid--three reveal">
          {homePathways.map((pathway) => (
            <NavigationCard
              key={pathway.title}
              className="reveal-child"
              title={pathway.title}
              description={pathway.description}
              to={pathway.to}
              ctaLabel={pathway.ctaLabel}
            />
          ))}
        </div>
      </Section>

      <Section title="Portfolio growth" intro="Built for expansion across additional Edinburgh listings and related services.">
        <div className="cards-grid">
          {portfolioPlaceholders.map((item) => (
            <article className="info-card portfolio-placeholder" key={item.title}>
              <p className="eyebrow">{item.status}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
