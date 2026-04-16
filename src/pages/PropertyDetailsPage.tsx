import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import { CtaButton } from '../components/CtaButton';
import { Section } from '../components/Section';
import { propertyListings } from '../data/property';

export function PropertyDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = propertyListings.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const featuresStripRef = useScrollReveal<HTMLDivElement>();
  const keyFeaturesGridRef = useScrollReveal<HTMLDivElement>();
  const fullDescGridRef = useScrollReveal<HTMLDivElement>();
  const galleryRef = useScrollReveal<HTMLDivElement>();
  const outdoorGridRef = useScrollReveal<HTMLDivElement>();
  const locationGridRef = useScrollReveal<HTMLDivElement>();
  const additionalInfoGridRef = useScrollReveal<HTMLDivElement>();
  const parallaxOffset = useParallax(0.1, 20);

  if (!property) {
    return <Navigate to="/" replace />;
  }

  const [heroImage, ...galleryImages] = property.images;
  const locationImages = property.images.filter((image) => image.category === 'location' || image.category === 'outdoor');
  const amenityImages = property.images.filter((image) => image.category === 'amenity');

  return (
    <>
      <section className="hero hero--property" aria-labelledby="property-hero-title">
        <div className="hero__content hero__content--property">
          <p className="eyebrow">Property details</p>
          <h1 id="property-hero-title">{property.title}</h1>
          <p className="hero__subtitle">{property.summary}</p>
          <div className="hero__price-block">
            <span className="hero__price">{property.monthlyRentDisplay}</span>
          </div>
          <p className="property-meta">
            <strong>{property.addressLine1}, Edinburgh, EH11 2AT</strong> · {property.propertyType} · Approx. 56m²
          </p>
          <div className="hero__actions">
            <CtaButton to="/enquiry">Enquire Now</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Arrange a Viewing
            </CtaButton>
          </div>
        </div>

        <aside className="property-hero-media" style={{ ['--parallax-offset' as string]: `${parallaxOffset}px` }}>
          <figure className="property-hero-media__featured image-frame">
            <img className="media-image media-image--hero" src={heroImage.src} alt={heroImage.alt} width={1280} height={960} loading="eager" />
          </figure>
          <div className="property-hero-media__thumbs" aria-hidden="true">
            {galleryImages.slice(0, 3).map((image) => (
              <figure key={image.src}>
                <img className="media-image" src={image.src} alt="" width={400} height={300} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </aside>
      </section>

      <div ref={featuresStripRef} className="features-strip reveal" role="list" aria-label="Property highlights">
        {property.keyFeatures.map((feature) => (
          <span className="feature-badge reveal-child" role="listitem" key={feature}>{feature}</span>
        ))}
      </div>

      <Section title="Property overview" intro="A premium long-term rental opportunity in Dalry.">
        <article className="panel">
          <p>{property.overview}</p>
        </article>
      </Section>

      <Section title="Key features" intro="Everything that makes this home stand out in today's Edinburgh rental market.">
        <div ref={keyFeaturesGridRef} className="cards-grid cards-grid--three reveal" role="list" aria-label="Key property features">
          {property.keyFeatures.map((feature) => (
            <article className="info-card reveal-child" role="listitem" key={feature}>
              <h3>{feature}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Full description" intro="A flowing layout designed for practical city living.">
        <div ref={fullDescGridRef} className="details-grid property-feature-grid reveal">
          <article className="panel reveal-child">
            <p>{property.fullDescription}</p>
          </article>
          <article className="panel panel--image reveal-child">
            <img
              className="media-image"
              src="/images/properties/caledonian-crescent/living-room-1.jpg"
              alt="Living room leading to private outdoor space"
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
            />
          </article>
        </div>
      </Section>

      <Section title="Property gallery" intro="A clear view of the space, finish, and setting.">
        <div ref={galleryRef} className="property-gallery reveal" role="list" aria-label="Property image gallery">
          {property.images.slice(0, 6).map((image) => (
            <figure className="property-gallery__item reveal-child" role="listitem" key={image.src} tabIndex={0} onClick={() => setActiveImage(image.src)} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveImage(image.src);
              }
            }}>
              <img className="media-image" src={image.src} alt={image.alt} width={1000} height={800} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Outdoor space and facilities" intro="Lifestyle benefits that elevate day-to-day renting.">
        <div ref={outdoorGridRef} className="details-grid reveal">
          <article className="panel reveal-child">
            <p>{property.outdoorAndFacilities}</p>
          </article>
          <div className="location-image-stack reveal-child" role="list" aria-label="Leisure facility images">
            {amenityImages.slice(0, 2).map((image) => (
              <figure key={image.src} className="location-image-stack__item" role="listitem">
                <img className="media-image" src={image.src} alt={image.alt} width={1200} height={750} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Location" intro="Well connected Dalry living with strong amenities and transport.">
        <div ref={locationGridRef} className="details-grid reveal">
          <article className="panel reveal-child">
            {property.locationFacts.map((fact) => (
              <p key={fact}>{fact}</p>
            ))}
          </article>
          <div className="location-image-stack reveal-child" role="list" aria-label="Local area and exterior images">
            {locationImages.slice(0, 2).map((image) => (
              <figure key={image.src} className="location-image-stack__item" role="listitem">
                <img className="media-image" src={image.src} alt={image.alt} width={1200} height={750} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Who it suits" intro="A natural fit for modern city renters.">
        <article className="panel">
          <p>{property.whoItSuits}</p>
        </article>
      </Section>

      <Section title="Additional information" intro="Useful details at a glance.">
        <div ref={additionalInfoGridRef} className="cards-grid cards-grid--three reveal" role="list" aria-label="Additional rental information">
          {property.additionalInformation.map((item) => (
            <article className="info-card reveal-child" role="listitem" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Enquire today" intro="Arrange a viewing and secure a high-quality Dalry rental that delivers more than a standard flat.">
        <div className="panel">
          <p>{property.closingValueStatement}</p>
          <div className="hero__actions">
            <CtaButton to="/enquiry">Enquire Now</CtaButton>
            <CtaButton to="/enquiry" variant="secondary">
              Arrange a Viewing
            </CtaButton>
          </div>
        </div>
      </Section>

      {activeImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded property photo" onClick={() => setActiveImage(null)}>
          <figure className="lightbox__panel" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage} alt="Expanded property view" width={1600} height={1000} />
            <figcaption className="lightbox__meta">
              <span>Tap outside to close</span>
              <button type="button" className="cta-button cta-button--secondary" onClick={() => setActiveImage(null)}>Close</button>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
