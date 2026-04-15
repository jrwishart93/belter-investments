function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="logo">BI</span>
          <div>
            <h1>Belter Investments Ltd</h1>
            <p>Edinburgh property investment and rental specialists</p>
          </div>
        </div>
        <nav>
          <a href="#about">About</a>
          <a href="#property">Property</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Investing in quality Edinburgh homes</p>
            <h2>Belter Investments Ltd buys a flat, renovates it, and rents it to great tenants.</h2>
            <p>
              We are a local Edinburgh property investor dedicated to delivering well-managed flats that are
              attractive, safe and comfortable for renters. Discover more about our current project and contact us
              to discuss future rental opportunities.
            </p>
            <a className="button" href="#contact">Enquire about renting</a>
          </div>
          <div className="hero-card">
            <h3>Current investment focus</h3>
            <p>Spacious 1-bedroom apartment in central Edinburgh with bright living space and easy transport links.</p>
            <ul>
              <li>City-centre location</li>
              <li>High-quality finishes</li>
              <li>Designed for long-term tenancy</li>
            </ul>
          </div>
        </section>

        <section id="about" className="section-light">
          <div className="section-content">
            <h2>About Belter Investments</h2>
            <p>
              Belter Investments Ltd is an Edinburgh-based property investment company focused on acquiring well-located
              flats and preparing them for reliable long-term rental. Our goal is to create an approachable, trusted
              service for landlords and tenants alike.
            </p>
            <div className="feature-grid">
              <div>
                <h3>Buy to rent</h3>
                <p>We source high-potential flats in Edinburgh and guide each property through purchase and preparation.</p>
              </div>
              <div>
                <h3>Tenant-focused</h3>
                <p>Our homes are designed to feel comfortable, practical and easy to live in for people seeking a quality flat.</p>
              </div>
              <div>
                <h3>Professional management</h3>
                <p>Maintenance, communication and move-in support are all part of the service we provide for our rental homes.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="property" className="section-dark">
          <div className="section-content">
            <h2>Flats for rent</h2>
            <p>
              Our current property will be available soon. It is ideal for young professionals, couples and anyone who
              wants a tidy, central Edinburgh home with strong links to local amenities.
            </p>
            <div className="property-preview">
              <div>
                <h3>Example Edinburgh flat</h3>
                <p>
                  Modern one-bedroom layout with comfortable open-plan kitchen and living area, a separate bedroom, and
                  bright windows.
                </p>
                <ul>
                  <li>Prepared for immediate viewing</li>
                  <li>Council tax and utilities guidance provided</li>
                  <li>Great access to tram, bus and nearby green spaces</li>
                </ul>
              </div>
              <div className="property-cta">
                <h4>Ready to rent?</h4>
                <p>Register your interest now and get first access to the flat once it goes live on the market.</p>
                <a className="button button-secondary" href="#contact">Register interest</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-light contact-section">
          <div className="section-content">
            <h2>Contact us</h2>
            <p>
              If you are interested in renting from Belter Investments Ltd or want more information about our next flat,
              get in touch and we will respond promptly.
            </p>
            <div className="contact-grid">
              <div>
                <p>
                  <strong>Email:</strong> <a href="mailto:hello@belterinvestments.co.uk">hello@belterinvestments.co.uk</a>
                </p>
                <p>
                  <strong>Location:</strong> Edinburgh, Scotland
                </p>
              </div>
              <div className="contact-card">
                <p>Quick enquiry</p>
                <a className="button" href="mailto:hello@belterinvestments.co.uk?subject=Renting%20enquiry">Email us</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Belter Investments Ltd © {new Date().getFullYear()}</p>
        <p>Delivering straightforward Edinburgh rental homes with integrity.</p>
      </footer>
    </div>
  );
}

export default App;
