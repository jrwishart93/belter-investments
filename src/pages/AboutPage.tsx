import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { brandPositioning } from '../data/site';

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Belter Investments"
        subtitle="A professional, family-run property business serving long-term tenants in Edinburgh."
      />

      <Section title="Our approach" intro={brandPositioning.shortStatement}>
        <div className="details-grid details-grid--single">
          <article className="panel">
            <p>{brandPositioning.supportingStatement}</p>
            <p>
              We focus on careful presentation, dependable management, and clear communication from first enquiry through to
              day-to-day tenancy support.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
