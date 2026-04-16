import { Navigate, useParams } from 'react-router-dom';
import { CtaButton } from '../components/CtaButton';
import { Section } from '../components/Section';
import { propertyListings } from '../data/property';

export function PropertyDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = propertyListings.find((item) => item.slug === slug);

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

      <div className="features-strip" role="list" aria-label="Property highlights">
        {property.keyFeatures.map((feature) => (
          <span className="feature-badge" role="listitem" key={feature}>{feature}</span>
        ))}
      </div>

      <Section title="Property overview" intro="A premium long-term rental opportunity in Dalry.">
        <article className="panel">
          <p>{property.overview}</p>
        </article>
      </Section>

      <Section title="Key features" intro="Everything that makes this home stand out in today’s Edinburgh rental market.">
        <div className="cards-grid cards-grid--three" role="list" aria-label="Key property features">
          {property.keyFeatures.map((feature) => (
            <article className="info-card" role="listitem" key={feature}>
              <h3>{feature}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Full description" intro="A flowing layout designed for practical city living.">
        <div className="details-grid property-feature-grid">
          <article className="panel">
            <p>{property.fullDescription}</p>
          </article>
          <article className="panel panel--image">
            <img
              src="/images/properties/caledonian-crescent/living-room-1.jpg"
              alt="Living room leading to private outdoor space"
              loading="lazy"
            />
          </article>
        </div>
      </Section>

      <Section title="Property gallery" intro="A clear view of the space, finish, and setting.">
        <div className="property-gallery" role="list" aria-label="Property image gallery">
          {property.images.slice(0, 6).map((image) => (
            <figure className="property-gallery__item" role="listitem" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Outdoor space and facilities" intro="Lifestyle benefits that elevate day-to-day renting.">
        <div className="details-grid">
          <article className="panel">
            <p>{property.outdoorAndFacilities}</p>
          </article>
          <div className="location-image-stack" role="list" aria-label="Leisure facility images">
            {amenityImages.slice(0, 2).map((image) => (
              <figure key={image.src} className="location-image-stack__item" role="listitem">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Location" intro="Well connected Dalry living with strong amenities and transport.">
        <div className="details-grid">
          <article className="panel">
            {property.locationFacts.map((fact) => (
              <p key={fact}>{fact}</p>
            ))}
          </article>
          <div className="location-image-stack" role="list" aria-label="Local area and exterior images">
            {locationImages.slice(0, 2).map((image) => (
              <figure key={image.src} className="location-image-stack__item" role="listitem">
                <img src={image.src} alt={image.alt} loading="lazy" />
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
        <div className="cards-grid cards-grid--three" role="list" aria-label="Additional rental information">
          {property.additionalInformation.map((item) => (
            <article className="info-card" role="listitem" key={item}>
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
    </>
  );
}
