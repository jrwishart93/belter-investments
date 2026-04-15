const featuredProperties = [
  {
    id: 'BI-101',
    title: 'New Town One-Bedroom Apartment',
    location: 'Northumberland Street, Edinburgh EH3',
    rent: '£1,250 pcm',
    beds: '1 bed',
    baths: '1 bath',
    status: 'Available now',
    summary:
      'Recently refurbished first-floor flat with bright bay-window lounge, modern kitchen and excellent city-centre transport links.'
  },
  {
    id: 'BI-214',
    title: 'West End Two-Bedroom Flat',
    location: 'Morrison Street, Edinburgh EH3',
    rent: '£1,650 pcm',
    beds: '2 bed',
    baths: '1 bath',
    status: 'Viewings open',
    summary:
      'Spacious two-bedroom property close to Haymarket with secure entry, generous storage and dedicated work-from-home space.'
  },
  {
    id: 'BI-307',
    title: 'Shore Apartment with Balcony',
    location: 'The Shore, Leith EH6',
    rent: '£1,450 pcm',
    beds: '1 bed',
    baths: '1 bath',
    status: 'Coming soon',
    summary:
      'Contemporary waterside apartment finished to a high standard, featuring open-plan living and short walk access to tram routes.'
  }
];

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#top" className="brand" id="top" aria-label="Belter Investments Ltd home">
          <span className="logo">BI</span>
          <div>
            <h1>Belter Investments Ltd</h1>
            <p>Professional property investment and lettings in Scotland</p>
          </div>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#properties">Properties</a>
          <a href="#enquiry">Enquiry</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Scotland-based property investment company</p>
            <h2>High-quality rental homes managed with integrity, clarity and local expertise.</h2>
            <p>
              Belter Investments Ltd is headquartered in Edinburgh and focuses on acquiring, improving and managing
              residential property across Scotland. We provide dependable rental opportunities for tenants and a
              professional, compliance-led service across every stage of tenancy.
            </p>
            <div className="hero-actions">
              <a className="button" href="#properties">
                View homes to rent
              </a>
              <a className="button button-secondary" href="#enquiry">
                Send an enquiry
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="Company highlights">
            <h3>Why tenants and partners choose us</h3>
            <ul>
              <li>Focused exclusively on long-term, well-maintained homes</li>
              <li>Clear communication and responsive property management</li>
              <li>Transparent application and referencing processes</li>
              <li>Local knowledge across Edinburgh and the wider Scottish market</li>
            </ul>
          </aside>
        </section>

        <section id="about" className="section section-light">
          <div className="section-content">
            <h2>About Belter Investments Ltd</h2>
            <p>
              Belter Investments Ltd is a Scottish property investment and lettings company committed to creating safe,
              attractive and professionally managed homes. Our investment strategy prioritises established residential
              neighbourhoods, efficient refurbishment and long-term rental quality.
            </p>

            <div className="feature-grid">
              <article>
                <h3>Our mission</h3>
                <p>
                  To provide dependable rental housing that meets modern tenant expectations while delivering sustainable
                  long-term value through responsible investment.
                </p>
              </article>
              <article>
                <h3>Our standards</h3>
                <p>
                  Every property is prepared to a professional specification with attention to safety, functionality,
                  comfort and maintenance planning.
                </p>
              </article>
              <article>
                <h3>Our location</h3>
                <p>
                  Based in Edinburgh, we operate throughout Scotland with particular focus on Edinburgh,
                  Midlothian and high-demand commuter areas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="properties" className="section section-dark">
          <div className="section-content">
            <h2>Properties for rent</h2>
            <p>
              Browse our current and upcoming rental listings. Availability and details are updated regularly;
              use the enquiry form below to request full brochures, virtual tours or viewing appointments.
            </p>

            <div className="property-grid" role="list" aria-label="Rental property listings">
              {featuredProperties.map((property) => (
                <article className="property-card" key={property.id} role="listitem">
                  <p className="property-id">Ref: {property.id}</p>
                  <h3>{property.title}</h3>
                  <p className="property-location">{property.location}</p>
                  <p className="property-summary">{property.summary}</p>
                  <div className="property-meta" aria-label="Property details">
                    <span>{property.rent}</span>
                    <span>{property.beds}</span>
                    <span>{property.baths}</span>
                  </div>
                  <p className="property-status">{property.status}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="enquiry" className="section section-light">
          <div className="section-content enquiry-layout">
            <div>
              <h2>Enquiry form</h2>
              <p>
                Interested in one of our properties or would like to discuss future rental opportunities?
                Complete the form and our team will respond promptly.
              </p>
              <p>
                You can also email us directly at{' '}
                <a href="mailto:hello@belterinvestments.co.uk">hello@belterinvestments.co.uk</a>.
              </p>
            </div>

            <form className="enquiry-form" action="mailto:hello@belterinvestments.co.uk" method="post" encType="text/plain">
              <label htmlFor="full-name">Full name</label>
              <input id="full-name" name="fullName" type="text" autoComplete="name" required />

              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required />

              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />

              <label htmlFor="property-interest">Property of interest</label>
              <select id="property-interest" name="propertyInterest" defaultValue="">
                <option value="" disabled>
                  Select a property reference
                </option>
                {featuredProperties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.id} - {property.title}
                  </option>
                ))}
                <option value="future-listings">Future listings</option>
              </select>

              <label htmlFor="message">Your message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your move-in timeframe, preferred area and any questions."
                required
              />

              <button type="submit" className="button">
                Submit enquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Belter Investments Ltd © {new Date().getFullYear()}</p>
        <p>Professional property investment and rental homes across Scotland.</p>
      </footer>
    </div>
  );
}

export default App;
