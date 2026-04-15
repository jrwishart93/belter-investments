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

  return (
    <>
      <section className="hero hero--property" aria-labelledby="property-hero-title">
        <div className="hero__content hero__content--property">
          <p className="eyebrow">Property details</p>
          <h1 id="property-hero-title">2 Bedroom Ground Floor Flat – Caledonian Crescent, Edinburgh</h1>
          <p>Private garden, leisure facilities, and excellent access to the city centre.</p>
          <p className="hero__price">£1,655 per month</p>
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

      <Section title="Property overview" intro="A premium long-term rental opportunity in Dalry.">
        <article className="panel">
          <p>{property.overview}</p>
        </article>
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
          {property.images.map((image) => (
            <figure className="property-gallery__item" role="listitem" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Outdoor space and facilities" intro="Lifestyle benefits that elevate day-to-day renting.">
        <div className="details-grid details-grid--single">
          <article className="panel">
            <p>{property.outdoorAndFacilities}</p>
          </article>
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

      <Section title="Why this rental stands out" intro="A strong Edinburgh option at £1,655 per month.">
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
