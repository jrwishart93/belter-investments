import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Belter Investments"
        subtitle="A professional, family-run property business serving long-term tenants in Edinburgh."
      />

      <Section title="Our approach" intro="Clear communication, reliable management, and well-presented properties.">
        <div className="details-grid details-grid--single">
          <article className="panel">
            <p>
              Belter Investments is a family-run, professional property business with experience in finance, business management,
              and property management.
            </p>
            <p>
              We focus on carefully managed properties and aim to provide a straightforward and dependable experience for tenants.
            </p>
          </article>
          <article className="panel">
            <p>
              If you own a property in Edinburgh and are looking for support, management, or advice, feel free to get in touch
              to discuss how we may be able to assist.
            </p>
            <p>
              We also have knowledge and experience in short-term lets and are happy to speak directly about this where relevant.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
