import { FormEvent, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { submitDetailedEnquiry, submitQuickMessage } from '../lib/forms';

const rentalPeriods = ['1–3 months', '3–6 months', '6–12 months', '1–2 years', '2+ years'];
const occupants = ['1 person', '2 persons', '3 persons', '4 persons', 'More'];
const leadSources = ['Facebook', 'Instagram', 'Gumtree', 'OpenRent', 'Zoopla', 'Other'];

export function EnquiryPage() {
  const [quickStatus, setQuickStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [detailedStatus, setDetailedStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const quickFormRef = useScrollReveal<HTMLFormElement>();
  const detailedFormRef = useScrollReveal<HTMLFormElement>();

  async function handleQuickMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuickStatus('loading');
    const form = new FormData(event.currentTarget);

    try {
      await submitQuickMessage({
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        message: String(form.get('message') ?? '')
      });
      event.currentTarget.reset();
      setQuickStatus('success');
    } catch {
      setQuickStatus('error');
    }
  }

  async function handleDetailedEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDetailedStatus('loading');
    const form = new FormData(event.currentTarget);

    try {
      await submitDetailedEnquiry({
        fullName: String(form.get('fullName') ?? ''),
        email: String(form.get('email') ?? ''),
        contactNumber: String(form.get('contactNumber') ?? ''),
        rentalPeriod: String(form.get('rentalPeriod') ?? ''),
        employed: String(form.get('employed') ?? '') as 'Yes' | 'No',
        student: String(form.get('student') ?? '') as 'Yes' | 'No',
        occupants: String(form.get('occupants') ?? ''),
        pets: String(form.get('pets') ?? '') as 'Yes' | 'No',
        petsNotes: String(form.get('petsNotes') ?? ''),
        smoking: String(form.get('smoking') ?? '') as 'Yes' | 'No',
        locationStatus: String(form.get('locationStatus') ?? ''),
        viewingPreference: String(form.get('viewingPreference') ?? '') as 'In-person viewing' | 'Virtual viewing',
        viewingInformation: String(form.get('viewingInformation') ?? ''),
        moveInDate: String(form.get('moveInDate') ?? ''),
        references: String(form.get('references') ?? '') as 'Yes' | 'No',
        furtherQuestions: String(form.get('furtherQuestions') ?? ''),
        leadSource: String(form.get('leadSource') ?? ''),
        leadSourceOther: String(form.get('leadSourceOther') ?? '')
      });
      event.currentTarget.reset();
      setDetailedStatus('success');
    } catch {
      setDetailedStatus('error');
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Enquiry"
        title="Get in touch about this long-term rental"
        subtitle="Use the quick message form for a fast question, or submit a detailed enquiry to help us assess your requirements."
      />

      <Section title="Quick Message" intro="A low-friction form for initial questions.">
        <form ref={quickFormRef} className="enquiry-form reveal" onSubmit={handleQuickMessage}>
          <label className="reveal-child" htmlFor="quick-name">Name</label>
          <input className="reveal-child" id="quick-name" name="name" type="text" required autoComplete="name" />

          <label className="reveal-child" htmlFor="quick-email">Email</label>
          <input className="reveal-child" id="quick-email" name="email" type="email" required autoComplete="email" />

          <label className="reveal-child" htmlFor="quick-message">Message</label>
          <textarea className="reveal-child" id="quick-message" name="message" rows={5} required />

          <button type="submit" className="cta-button reveal-child" disabled={quickStatus === 'loading'}>
            {quickStatus === 'loading' ? 'Sending...' : 'Send Quick Message'}
          </button>
          {quickStatus === 'success' ? <p className="success-text" role="status" aria-live="polite">Thanks, we'll be in touch shortly.</p> : null}
          {quickStatus === 'error' ? <p className="error-text" role="status" aria-live="polite">Unable to send right now. Please try again shortly.</p> : null}
        </form>
      </Section>

      <Section title="Detailed Enquiry" intro="For serious applicants, this form helps us understand your tenancy profile and viewing preferences.">
        <form ref={detailedFormRef} className="enquiry-form reveal" onSubmit={handleDetailedEnquiry}>
          <fieldset className="reveal-child">
            <legend>Basic information</legend>
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" required autoComplete="name" />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />

            <label htmlFor="contactNumber">Contact Number</label>
            <input id="contactNumber" name="contactNumber" type="tel" required autoComplete="tel" />
          </fieldset>

          <fieldset className="reveal-child">
            <legend>Tenancy profile</legend>
            <label htmlFor="rentalPeriod">Rental Period</label>
            <select id="rentalPeriod" name="rentalPeriod" required>
              <option value="">Select period</option>
              {rentalPeriods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>

            <label htmlFor="employed">Are you employed?</label>
            <select id="employed" name="employed" required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="student">Are you a student?</label>
            <select id="student" name="student" required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="occupants">Occupants</label>
            <select id="occupants" name="occupants" required>
              <option value="">Select occupancy</option>
              {occupants.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="reveal-child">
            <legend>Additional preferences</legend>
            <label htmlFor="pets">Pets</label>
            <select id="pets" name="pets" required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="petsNotes">If yes, please provide brief details (optional)</label>
            <input id="petsNotes" name="petsNotes" type="text" />

            <label htmlFor="smoking">Do you smoke?</label>
            <select id="smoking" name="smoking" required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="locationStatus">Location status</label>
            <select id="locationStatus" name="locationStatus" required>
              <option value="">Select status</option>
              <option value="Live or work in Edinburgh">I live or work in Edinburgh already</option>
              <option value="Moving to Edinburgh">I am newly moving to the area</option>
            </select>
          </fieldset>

          <fieldset className="reveal-child">
            <legend>Viewing and references</legend>
            <label htmlFor="viewingPreference">Viewing preference</label>
            <select id="viewingPreference" name="viewingPreference" required>
              <option value="">Select preference</option>
              <option value="In-person viewing">In-person viewing</option>
              <option value="Virtual viewing">Virtual viewing</option>
            </select>

            <label htmlFor="viewingInformation">Please provide any further information on when you would like to arrange this</label>
            <textarea id="viewingInformation" name="viewingInformation" rows={3} />

            <label htmlFor="moveInDate">Move-in Date</label>
            <input id="moveInDate" name="moveInDate" type="date" required />

            <label htmlFor="references">Do you have references from previous landlords?</label>
            <select id="references" name="references" required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </fieldset>

          <fieldset className="reveal-child">
            <legend>Final details</legend>
            <label htmlFor="furtherQuestions">Do you have any further questions about the property?</label>
            <textarea id="furtherQuestions" name="furtherQuestions" rows={4} />

            <label htmlFor="leadSource">Lead source</label>
            <select id="leadSource" name="leadSource" required>
              <option value="">Select source</option>
              {leadSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>

            <label htmlFor="leadSourceOther">If Other, please specify</label>
            <input id="leadSourceOther" name="leadSourceOther" type="text" />
          </fieldset>

          <button type="submit" className="cta-button reveal-child" disabled={detailedStatus === 'loading'}>
            {detailedStatus === 'loading' ? 'Sending...' : 'Submit Detailed Enquiry'}
          </button>
          {detailedStatus === 'success' ? <p className="success-text" role="status" aria-live="polite">Thanks, we'll be in touch shortly.</p> : null}
          {detailedStatus === 'error' ? <p className="error-text" role="status" aria-live="polite">Unable to send right now. Please try again shortly.</p> : null}
        </form>
      </Section>
    </>
  );
}
