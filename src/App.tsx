import { useEffect, useState } from 'react';
import { CtaButton } from './components/CtaButton';
import { InfoCard } from './components/InfoCard';
import { Section } from './components/Section';
import { propertyData } from './data/property';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'property-details', label: 'Property Details' },
  { id: 'location', label: 'Location' },
  { id: 'enquiries', label: 'Enquiries' }
];

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const updateSectionFromHash = () => {
      const nextHash = window.location.hash.replace('#', '');
      if (nextHash) {
        setActiveSection(nextHash);
      }
    };

    updateSectionFromHash();
    window.addEventListener('hashchange', updateSectionFromHash);

    return () => {
      window.removeEventListener('hashchange', updateSectionFromHash);
    };
  }, []);

  return (
    <div className="page-shell" id="home">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Go to home section">
          <span className="brand__mark" aria-hidden="true">
            CC
          </span>
          <span>
            <strong>{propertyData.addressLine1}</strong>
            <small>Long-term rental listing in Edinburgh</small>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="site-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id || (item.id === 'home' && activeSection === '') ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="home-heading">
          <div className="hero__content">
            <p className="eyebrow">Long-term residential letting</p>
            <h1 id="home-heading">{propertyData.addressLine1}, Edinburgh</h1>
            <p className="hero__price">{propertyData.monthlyRentDisplay}</p>
            <p>{propertyData.summary}</p>

            <div className="hero__actions">
              <CtaButton href="#enquiries" ariaLabel="Enquire now about this property">
                Enquire Now
              </CtaButton>
              <CtaButton href="#enquiries" variant="secondary" ariaLabel="Arrange a viewing for this property">
                Arrange Viewing
              </CtaButton>
            </div>
          </div>

          <aside className="panel" aria-label="Property snapshot">
            <h2>Property snapshot</h2>
            <dl className="snapshot-grid">
              <div>
                <dt>Rent</dt>
                <dd>{propertyData.monthlyRentDisplay}</dd>
              </div>
              <div>
                <dt>Property type</dt>
                <dd>{propertyData.propertyType}</dd>
              </div>
              <div>
                <dt>Bedrooms</dt>
                <dd>{propertyData.bedrooms}</dd>
              </div>
              <div>
                <dt>Suitable for</dt>
                <dd>{propertyData.suitability}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <Section
          id="property-details"
          title="Property Details"
          intro="Full property information for prospective long-term tenants."
          tone="light"
        >
          <div className="details-grid">
            <article className="panel">
              <h3>Overview</h3>
              <p>{propertyData.description}</p>
              <p>
                <strong>Monthly rent:</strong> {propertyData.monthlyRentDisplay}
              </p>
              <p>
                <strong>Property type:</strong> {propertyData.propertyType}
              </p>
              <p>
                <strong>Bedrooms:</strong> {propertyData.bedrooms}
              </p>
            </article>

            <article className="panel">
              <h3>Key features</h3>
              <ul className="list-clean">
                {propertyData.keyFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="cards-grid" role="list" aria-label="Key highlights">
            {propertyData.keyHighlights.map((item) => (
              <InfoCard key={item} title="Highlight" body={item} />
            ))}
          </div>
        </Section>

        <Section
          id="location"
          title="Location"
          intro="Helpful area information for people relocating within Edinburgh for work or study."
          tone="dark"
        >
          <div className="location-grid">
            <article className="panel panel--dark">
              <h3>Area benefits</h3>
              <ul className="list-clean">
                {propertyData.locationBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>

            <article className="panel panel--dark">
              <h3>Transport links</h3>
              <ul className="list-clean">
                {propertyData.transportLinks.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </article>

            <article className="panel panel--dark">
              <h3>Nearby amenities</h3>
              <ul className="list-clean">
                {propertyData.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
              <p className="floorplan-note">Floorplan placeholder: available on request.</p>
            </article>
          </div>
        </Section>

        <Section
          id="enquiries"
          title="Enquiries"
          intro="Send your details and preferred move-in date, and the landlord or property manager will respond directly."
          tone="light"
        >
          <div className="enquiry-layout">
            <article className="panel">
              <h3>Contact path</h3>
              <p>
                For questions about tenancy terms, availability or viewings, complete the form or email{' '}
                <a href={`mailto:${propertyData.contactEmail}`}>{propertyData.contactEmail}</a>.
              </p>
              <p>
                <strong>Phone:</strong> <a href={`tel:${propertyData.contactPhone}`}>{propertyData.contactPhone}</a>
              </p>
              <p>Responses are provided directly by the landlord or property manager.</p>
            </article>

            {/* TODO: connect this form to backend enquiry endpoint when API is available. */}
            <form className="enquiry-form" action="mailto:hello@belterinvestments.co.uk" method="post" encType="text/plain">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />

              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" required />

              <label htmlFor="moveInDate">Preferred move-in date (optional)</label>
              <input id="moveInDate" name="moveInDate" type="date" />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Please include your preferred viewing times and any key tenancy questions."
              />

              <button type="submit" className="cta-button">
                Enquire about this property
              </button>
            </form>
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <p>{propertyData.fullAddress}</p>
        <p>
          Contact: <a href={`mailto:${propertyData.contactEmail}`}>{propertyData.contactEmail}</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
