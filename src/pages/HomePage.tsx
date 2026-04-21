import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [showAgmDetails, setShowAgmDetails] = useState(false);
  const pathwaysRef = useScrollReveal<HTMLDivElement>();
  const trustRef = useScrollReveal<HTMLDivElement>();
  const portfolioRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        className="hero--landing"
        brandMark={
          <img
            className="hero__brand-logo"
            src="/images/logo/belter-wordmark-transparent.png"
            alt="Belter"
            width="776"
            height="312"
          />
        }
        title="Edinburgh homes, managed properly."
        subtitle="We offer a professional and responsive service with clear communication throughout."
        details={
          <>
            <p className="hero__supporting">
              Based locally in Edinburgh, we are on hand to deal with any queries or issues quickly.
            </p>
          </>
        }
        actions={
          <>
            <CtaButton to={`/properties/${featuredProperty.slug}`}>View Available Property</CtaButton>
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
        <article className="panel agm-announcement">
          <h3>AGM Thursday 4th June for owners</h3>
          <p>
            The James Square AGM is approaching. Owners can review updates and vote on plans for improvements. If
            you are a tenant, please make your owner aware.
          </p>

          {showAgmDetails ? (
            <div className="agm-announcement__details">
              <p>
                The Annual General Meeting gives owners the opportunity to find out what has been happening at James
                Square and to vote on plans for improvements going forward. This will be our first AGM with Myreside
                Management as factors, taking place on Thursday 4th June 2026 via Microsoft Teams.
              </p>
              <p>
                For more information, and to leave suggestions on what you would like discussed, please visit the AGM
                page.
              </p>
              <Link className="text-link" to="/AGM">
                Visit AGM page
                <ArrowRight className="link-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
              </Link>
            </div>
          ) : null}

          <button className="announcement-toggle" type="button" onClick={() => setShowAgmDetails((current) => !current)}>
            {showAgmDetails ? 'Show less' : 'Read more'}
          </button>
        </article>

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
        intro="The current available listing is a fully furnished two bedroom apartment within James Square, a secure gated development in Edinburgh’s West End."
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
