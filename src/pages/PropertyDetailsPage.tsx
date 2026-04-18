import { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CtaButton } from '../components/CtaButton';
import { Section } from '../components/Section';
import { propertyListings } from '../data/property';

export function PropertyDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = propertyListings.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeImage) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveImage(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeImage]);

  const featuresStripRef = useScrollReveal<HTMLDivElement>();
  const galleryRef = useScrollReveal<HTMLDivElement>();
  const advertGridRef = useScrollReveal<HTMLDivElement>();

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  const [heroImage, ...galleryImages] = property.images;
  const priceOrAvailability = property.availabilityDisplay ?? property.monthlyRentDisplay;

  return (
    <>
      <section className="hero hero--property" aria-labelledby="property-hero-title">
        <div className="hero__content hero__content--property">
          <p className="eyebrow">Belter Properties</p>
          <h1 id="property-hero-title">{property.title}</h1>
          <p className="hero__subtitle">{property.summary}</p>
          <div className="hero__price-block">
            <span className="hero__price">{priceOrAvailability}</span>
          </div>
          <p className="property-meta">
            <strong>{property.addressLine1}, {property.city}</strong> · {property.propertyType} · {property.status}
          </p>
          <div className="hero__actions">
            <CtaButton to="/enquiries">Enquire Now</CtaButton>
            <CtaButton to="/enquiries" variant="secondary">
              Arrange a Viewing
            </CtaButton>
          </div>
        </div>

        <aside className="property-hero-media panel">
          <figure className="property-hero-media__featured">
            <img src={heroImage.src} alt={heroImage.alt} loading="eager" />
          </figure>
          <div className="property-hero-media__thumbs" aria-hidden="true">
            {galleryImages.slice(0, 3).map((image) => (
              <img key={image.src} src={image.src} alt="" loading="lazy" />
            ))}
          </div>
        </aside>
      </section>

      <div ref={featuresStripRef} className="features-strip reveal" role="list" aria-label="Property highlights">
        {property.keyFeatures.map((feature) => (
          <span className="feature-badge reveal-child" role="listitem" key={feature}>{feature}</span>
        ))}
      </div>

      <Section title="Property overview" intro={property.description}>
        <article className="panel">
          <p>{property.overview}</p>
        </article>
      </Section>

      <Section title="Property gallery" intro="A clear view of the space, finish, and setting.">
        <div ref={galleryRef} className="property-gallery reveal" role="list" aria-label="Property image gallery">
          {property.images.slice(0, 6).map((image) => (
            <figure
              className="property-gallery__item reveal-child"
              role="button"
              aria-label={`View ${image.alt} full size`}
              tabIndex={0}
              key={image.src}
              onClick={() => setActiveImage(image)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveImage(image); } }}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Full advert details" intro="Property-specific details taken from the full rental advert.">
        <div ref={advertGridRef} className="advert-details-grid reveal">
          {property.advertSections.map((section) => (
            <article className="info-card advert-detail reveal-child" key={section.title}>
              <h3>{section.title}</h3>
              {section.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Enquire today" intro="Use Belter Enquiries for viewing, availability, or portfolio questions.">
        <div className="panel">
          <p>{property.closingValueStatement}</p>
          <div className="hero__actions">
            <CtaButton to="/enquiries">Enquire Now</CtaButton>
            <CtaButton to="/enquiries" variant="secondary">
              Arrange a Viewing
            </CtaButton>
          </div>
        </div>
      </Section>

      {activeImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded property photo"
          onClick={() => setActiveImage(null)}
        >
          <figure className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} />
            <figcaption className="lightbox__meta">
              <button
                ref={closeBtnRef}
                type="button"
                className="cta-button cta-button--secondary"
                onClick={() => setActiveImage(null)}
              >
                Close
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
