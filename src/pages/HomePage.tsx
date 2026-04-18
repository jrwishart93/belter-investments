import { useScrollReveal } from '../hooks/useScrollReveal';
import { CtaButton } from '../components/CtaButton';
import { NavigationCard } from '../components/NavigationCard';
import { PageHero } from '../components/PageHero';
import { PropertyPreviewGrid } from '../components/PropertyPreviewGrid';
import { Section } from '../components/Section';
import { featuredProperty, propertyListings } from '../data/property';
import { featuredHighlights, getHomePathways } from '../data/homepage';
import { brandPositioning, siteConfig } from '../data/site';

const homePathways = getHomePathways();
const portfolioProperties = propertyListings.filter((property) => !property.featured);

export function HomePage() {
  const pathwaysRef = useScrollReveal<HTMLDivElement>();
  const trustRef = useScrollReveal<HTMLDivElement>();
  const portfolioRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        className="hero--landing"
        eyebrow="Family-run Edinburgh property"
        brandMark={
          <img
            className="hero__brand-logo"
            src="/images/logo/belter-wordmark-transparent.png"
            alt="Belter"
            width="776"
            height="312"
          />
        }
        title="Edinburgh residential property, handled with care."
        subtitle="Well presented homes in Edinburgh, managed properly."
        details={
          <>
            <p className="hero__supporting">
              We provide a professional and responsive service with clear communication throughout. As we are based locally, we are on hand to deal with any queries or issues quickly.
            </p>
          </>
        }
        actions={
          <>
            <CtaButton to={`/properties/${featuredProperty.slug}`}>View Featured Property</CtaButton>
            <CtaButton to="/properties" variant="secondary">
              Browse Properties
            </CtaButton>
            <CtaButton to="/enquiries" variant="secondary">
              Make an Enquiry
            </CtaButton>
          </>
        }
        aside={
          <picture className="image-block image-block--home-hero">
            <source srcSet="/images/Home_images/Night-drone-js.png" media="(prefers-color-scheme: dark)" />
            <img
              src="/images/Home_images/Day-drone-js.png"
              alt="Aerial view of Edinburgh residential property"
              width="1536"
              height="1024"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        }
      />

      <Section title="A considered property portfolio" intro={brandPositioning.shortStatement}>
        <div ref={trustRef} className="details-grid reveal">
          <article className="panel reveal-child">
            <p>{brandPositioning.supportingStatement}</p>
          </article>
          <article className="panel reveal-child">
            <ul className="brand-pillars" aria-label={`${siteConfig.companyName} brand pillars`}>
              {brandPositioning.pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        title="Featured property"
        intro="61/1 Caledonian Crescent is the current main listing: a bright main door apartment with private garden, secure parking, and residents’ leisure facilities."
      >
        <PropertyPreviewGrid
          properties={[featuredProperty]}
          highlightsBySlug={{
            [featuredProperty.slug]: featuredHighlights
          }}
        />
      </Section>

      <Section
        title="Property portfolio"
        intro="A concise view of additional Edinburgh homes in the portfolio, ready to scale as new properties are added."
      >
        <div ref={portfolioRef} className="reveal">
          <PropertyPreviewGrid properties={portfolioProperties} variant="compact" />
        </div>
      </Section>

      <Section
        title="Where would you like to go?"
        intro="Use the homepage as a clean starting point for property details, enquiries, or company background."
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
    </>
  );
}
