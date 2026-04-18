import { CtaButton } from '../components/CtaButton';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';

const experiencePoints = [
  'Managing rental properties in a responsive and straightforward way',
  'Running and improving short-term lets, including Airbnb',
  'Handling licensing requirements, including Edinburgh short-term let licences',
  'Keeping properties well presented and properly maintained'
];

const ownerSupport = [
  'Full management of long-term or short-term lets',
  'Support with licensing and compliance',
  'Advertising and promoting your property properly',
  'Building a website to showcase your property',
  'Ongoing help to improve occupancy and returns'
];

export function InvestmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Belter Investments"
        title="About Belter Investments"
        subtitle="A family-run property business based in Scotland, focused on residential property across Edinburgh and the wider Central Belt."
        actions={
          <>
            <CtaButton to="/properties">View Properties</CtaButton>
            <CtaButton to="/enquiries" variant="secondary">
              Get in Touch
            </CtaButton>
          </>
        }
      />

      <Section title="About Belter Investments">
        <div className="details-grid details-grid--single">
          <article className="panel investment-copy-panel">
            <p>
              Belter Investments is a family-run property business based in Scotland. We focus on buying and managing
              residential properties across Edinburgh and the wider Central Belt.
            </p>
            <p>
              We keep things simple. Well looked after homes, clear communication, and a service that people can rely
              on. The aim is to create places that tenants and guests are genuinely happy to live in, while building
              something solid for the long term.
            </p>
            <p>
              The people behind Belter Investments come from finance, business, and legal backgrounds. That experience
              shapes how we work. We take compliance seriously, think long term, and treat every property as if it
              matters, because it does.
            </p>
            <p>
              Property is not just numbers on a spreadsheet. It is where people live their day-to-day lives. That is why
              we focus on doing things properly and keeping standards high across everything we manage.
            </p>
          </article>
        </div>
      </Section>

      <Section
        title="What We Do"
        intro="We build and manage a portfolio of residential properties across Scotland, including both long-term lets and short-term stays."
      >
        <div className="cards-grid cards-grid--two">
          <article className="info-card">
            <h3>Property Management</h3>
            <p>
              We manage residential properties with a practical, hands-on approach. The goal is to make property
              ownership easier and more effective, whether it is a single flat or a growing portfolio.
            </p>
          </article>
          <article className="info-card">
            <h3>Experience</h3>
            <ul className="investment-list">
              {experiencePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        title="Work With Us"
        intro="We are always looking to add to our portfolio and are open to sensible conversations about property across Edinburgh and the wider Central Belt."
      >
        <div className="details-grid">
          <article className="panel investment-copy-panel">
            <p>
              If you have a property, or know of one that might be suitable, we would be glad to have a conversation.
            </p>
            <p>
              We also work with owners who want help managing or improving their property. If you want a more hands-on
              approach, we can help with that.
            </p>
          </article>
          <article className="panel">
            <h3>How We Can Help</h3>
            <ul className="investment-list investment-list--split">
              {ownerSupport.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section title="Get in Touch" intro="If you would like to discuss a property or just have a question, send an enquiry and we will come back to you as soon as we can.">
        <article className="panel investment-contact-panel">
          <div>
            <h3>Start a Conversation</h3>
            <p>
              Use the enquiry page for property management, short-term let, business, or general questions.
            </p>
          </div>
          <CtaButton to="/enquiries">Make an Enquiry</CtaButton>
        </article>
      </Section>
    </>
  );
}
