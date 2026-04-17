import { CtaButton } from '../components/CtaButton';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { brandPositioning } from '../data/site';

const investmentPrinciples = [
  {
    title: 'Family-run',
    description:
      'Direct ownership, practical decision-making, and a personal standard of care across the portfolio.'
  },
  {
    title: 'Residential focus',
    description:
      'Long-term Edinburgh homes selected for location, presentation, and dependable tenant experience.'
  },
  {
    title: 'Long-term view',
    description:
      'A measured portfolio approach designed around resilience, standards, and careful growth.'
  }
];

export function InvestmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Belter Investments"
        title="The family-run company behind the Belter portfolio."
        subtitle="Belter Investments brings together property ownership, finance experience, business management, and hands-on letting standards."
        actions={
          <>
            <CtaButton to="/properties">View Properties</CtaButton>
            <CtaButton to="/enquiries" variant="secondary">
              Business Enquiry
            </CtaButton>
          </>
        }
      />

      <Section title="Company focus" intro={brandPositioning.supportingStatement}>
        <div className="details-grid details-grid--single">
          <article className="panel">
            <p>
              Belter Investments sits behind the Belter property activity as a family-run Edinburgh business. The aim is
              to build a credible, well-managed residential portfolio without losing the personal approach that makes a
              small property business trustworthy.
            </p>
          </article>
        </div>
      </Section>

      <Section title="Investment principles" intro="A simple operating view for a growing residential property portfolio.">
        <div className="cards-grid cards-grid--three">
          {investmentPrinciples.map((principle) => (
            <article className="info-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Long-term vision" intro="Belter can grow into future services while remaining grounded in property.">
        <article className="panel">
          <p>
            The current focus is residential property in Edinburgh. Future Belter-branded areas can sit alongside it,
            while Belter Investments remains the professional company foundation.
          </p>
        </article>
      </Section>
    </>
  );
}
