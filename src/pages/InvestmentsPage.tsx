import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AccountUpgradePrompt } from '../components/AccountUpgradePrompt';
import { CtaButton } from '../components/CtaButton';
import { MultiStepFormWrapper, WizardReviewScreen } from '../components/MultiStepFormWrapper';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import { submitInvestmentEnquiry, type EnquirySection } from '../lib/forms';

type InvestmentFormState = {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  serviceInterest: string[];
  propertyOwnership: string;
  propertyAddressOrArea: string;
  propertyType: string;
  bedrooms: string;
  occupied: string;
  letType: string;
  shortTermOperated: string;
  shortTermLicenceStatus: string;
  platforms: string[];
  currentlyRented: string;
  managementType: string;
  advertisingHelp: string;
  advertisedWhere: string[];
  websiteHelp: string;
  websiteGoals: string[];
  investmentInterest: string;
  estimatedValue: string;
  timeline: string;
  goals: string[];
  message: string;
  moveForward: string;
};

type FormField = {
  label: string;
  value: string;
};

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

const initialInvestmentForm: InvestmentFormState = {
  fullName: '',
  email: '',
  phone: '',
  preferredContact: '',
  serviceInterest: [],
  propertyOwnership: '',
  propertyAddressOrArea: '',
  propertyType: '',
  bedrooms: '',
  occupied: '',
  letType: '',
  shortTermOperated: '',
  shortTermLicenceStatus: '',
  platforms: [],
  currentlyRented: '',
  managementType: '',
  advertisingHelp: '',
  advertisedWhere: [],
  websiteHelp: '',
  websiteGoals: [],
  investmentInterest: '',
  estimatedValue: '',
  timeline: '',
  goals: [],
  message: '',
  moveForward: ''
};

const serviceOptions = [
  'Property Management',
  'Short Term Let Support',
  'Long Term Let Support',
  'Advertising your Property',
  'Website Design for your Property',
  'Advice or General Chat',
  'Selling or Introducing a Property',
  'Adding a Property to the Belter Portfolio'
];

const goalOptions = [
  'Increase rental income',
  'Hands off management',
  'Better guest or tenant experience',
  'Move into short term letting',
  'Build a property portfolio',
  'Other'
];

const addField = (fields: FormField[], label: string, value: string | string[]) => {
  const displayValue = Array.isArray(value) ? value.join(', ') : value;
  if (displayValue.trim()) {
    fields.push({ label, value: displayValue });
  }
};

function InvestmentTextInput({
  id,
  label,
  value,
  onChange,
  required = false,
  type = 'text',
  autoComplete
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} autoComplete={autoComplete} />
    </div>
  );
}

function InvestmentTextArea({
  id,
  label,
  value,
  onChange,
  required = false
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <textarea id={id} name={id} rows={5} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </div>
  );
}

function InvestmentRadioGroup({
  name,
  label,
  value,
  options,
  onChange,
  required = false
}: {
  name: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="field-group">
      <p className="field-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</p>
      <div className="choice-grid">
        {options.map((option) => (
          <label className="choice-option" key={option}>
            <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} required={required} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function InvestmentCheckboxGroup({
  name,
  label,
  values,
  options,
  onChange,
  required = false
}: {
  name: string;
  label: string;
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}) {
  return (
    <div className="field-group">
      <p className="field-label">{label}{required ? <span aria-hidden="true"> *</span> : null}</p>
      <div className="choice-grid">
        {options.map((option) => (
          <label className="choice-option" key={option}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={(event) => {
                onChange(event.target.checked ? [...values, option] : values.filter((item) => item !== option));
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function InvestmentFieldset({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="form-section-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

function buildSections(form: InvestmentFormState): EnquirySection[] {
  const sections: EnquirySection[] = [];
  const section = (title: string, fields: FormField[]) => {
    if (fields.length > 0) {
      sections.push({ title, fields });
    }
  };

  const basic: FormField[] = [];
  addField(basic, 'Full Name', form.fullName);
  addField(basic, 'Email Address', form.email);
  addField(basic, 'Phone Number', form.phone);
  addField(basic, 'Preferred Contact Method', form.preferredContact);
  section('Basic Details', basic);

  const service: FormField[] = [];
  addField(service, 'What would you like help with?', form.serviceInterest);
  section('What are you looking for?', service);

  const property: FormField[] = [];
  addField(property, 'Do you currently own the property?', form.propertyOwnership);
  addField(property, 'Property Address or Area', form.propertyAddressOrArea);
  addField(property, 'Property Type', form.propertyType);
  addField(property, 'Number of Bedrooms', form.bedrooms);
  addField(property, 'Is the property currently occupied?', form.occupied);
  section('Property Details', property);

  const letFields: FormField[] = [];
  addField(letFields, 'What type of let are you interested in?', form.letType);
  addField(letFields, 'Have you already operated as a short term let?', form.shortTermOperated);
  addField(letFields, 'Do you currently have a licence or applied for one?', form.shortTermLicenceStatus);
  addField(letFields, 'Platforms using or planning to use', form.platforms);
  addField(letFields, 'Is the property currently rented?', form.currentlyRented);
  addField(letFields, 'Full management or tenant find only?', form.managementType);
  section('Let Type', letFields);

  const advertising: FormField[] = [];
  addField(advertising, 'Do you want help advertising your property?', form.advertisingHelp);
  addField(advertising, 'Where is it currently advertised?', form.advertisedWhere);
  addField(advertising, 'Do you want a website for your property?', form.websiteHelp);
  addField(advertising, 'What would you like the website to do?', form.websiteGoals);
  section('Advertising and Website Support', advertising);

  const portfolio: FormField[] = [];
  addField(portfolio, 'Are you looking to', form.investmentInterest);
  addField(portfolio, 'Estimated property value', form.estimatedValue);
  addField(portfolio, 'Expected timeline', form.timeline);
  section('Portfolio / Investment Interest', portfolio);

  const goals: FormField[] = [];
  addField(goals, 'What are you hoping to achieve?', form.goals);
  section('Your Goals', goals);

  const additional: FormField[] = [];
  addField(additional, 'Tell us a bit more about what you are looking for', form.message);
  section('Additional Information', additional);

  const final: FormField[] = [];
  addField(final, 'How soon are you looking to move forward?', form.moveForward);
  section('Final Step', final);

  return sections;
}

export function InvestmentsPage() {
  const { configured, register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<InvestmentFormState>(initialInvestmentForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [investCreateAccount, setInvestCreateAccount] = useState(false);
  const [investPassword, setInvestPassword] = useState('');

  const setField = <K extends keyof InvestmentFormState>(field: K, value: InvestmentFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const hasProperty = ['Yes', 'In the process of buying', 'No, but I am exploring options'].includes(form.propertyOwnership);
  const showShortTerm = form.letType === 'Short Term Let' || form.serviceInterest.includes('Short Term Let Support');
  const showLongTerm = form.letType === 'Long Term Let' || form.serviceInterest.includes('Long Term Let Support');
  const showAdvertising = form.advertisingHelp === 'Yes' || form.serviceInterest.includes('Advertising your Property');
  const showWebsite = form.websiteHelp === 'Yes' || form.serviceInterest.includes('Website Design for your Property');
  const showPortfolioDetails = ['Sell a property', 'Partner on an investment', 'Introduce an opportunity'].includes(form.investmentInterest)
    || form.serviceInterest.includes('Selling or Introducing a Property')
    || form.serviceInterest.includes('Adding a Property to the Belter Portfolio');

  const investmentStepTitles = [
    'Basic Details',
    'What are you looking for?',
    'Property Details',
    'Let Type',
    'Advertising and Website Support',
    'Portfolio / Investment Interest',
    'Your Goals',
    'Additional Information',
    'Final Step'
  ];

  const validators = useMemo(() => [
    () => {
      if (!form.fullName.trim()) return 'Please add your full name.';
      if (!form.email.trim()) return 'Please add your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please add a valid email address.';
      if (!form.phone.trim()) return 'Please add your phone number.';
      return '';
    },
    () => form.serviceInterest.length === 0 ? 'Please choose at least one thing you would like help with.' : '',
    () => '',
    () => '',
    () => '',
    () => '',
    () => '',
    () => !form.message.trim() ? 'Please tell us a bit more about what you are looking for.' : '',
    () => ''
  ], [form.fullName, form.email, form.phone, form.serviceInterest, form.message]);

  const wizard = useMultiStepForm(9, validators);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (investCreateAccount && !user && investPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      setStatus('error');
      return;
    }

    try {
      const accountUser = investCreateAccount && !user
        ? await register({ fullName: form.fullName, email: form.email, phone: form.phone, password: investPassword })
        : user;
      const authIdToken = accountUser ? await accountUser.getIdToken() : undefined;

      await submitInvestmentEnquiry({
        ...form,
        sections: buildSections(form),
        authIdToken,
        accountCreated: Boolean(investCreateAccount || user)
      });
      setForm(initialInvestmentForm);
      setStatus('success');
      if (investCreateAccount && !user) navigate('/portal');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit investment enquiry right now.');
      setStatus('error');
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Belter Investments"
        title="About Belter Investments"
        subtitle="A family-run property business based in Scotland, focused on residential property across Edinburgh and the wider Central Belt."
        actions={
          <>
            <CtaButton to="/properties">View Properties</CtaButton>
            <CtaButton to="/investments#investment-enquiry" variant="secondary">
              Work With Us
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

      <Section
        id="investment-enquiry"
        title="Work with Belter Investments"
        intro="If you are looking for support with a property, or want to explore working with us, fill in the form below and we will come back to you as soon as we can."
      >
        {status === 'success' ? (
          <p className="success-text" role="status">Thanks, we will be in touch shortly.</p>
        ) : (
          <form className="enquiry-form enquiry-form--detailed investment-enquiry-form" onSubmit={handleSubmit} noValidate>
            <MultiStepFormWrapper
              currentStep={wizard.currentStep}
              direction={wizard.direction}
              isReviewing={wizard.isReviewing}
              fromReview={wizard.fromReview}
              stepError={wizard.stepError}
              progress={wizard.progress}
              totalSteps={9}
              stepLabel={wizard.isReviewing ? undefined : `Step ${wizard.currentStep + 1} of 9 — ${investmentStepTitles[wizard.currentStep]}`}
              onNext={wizard.goNext}
              onBack={wizard.goBack}
              submitLabel="Submit Enquiry"
              submitDisabled={status === 'loading'}
            >
              {wizard.isReviewing ? (
                <>
                  <WizardReviewScreen
                    sections={buildSections(form)}
                    onEdit={wizard.editStep}
                    stepTitles={investmentStepTitles}
                  />
                  <AccountUpgradePrompt
                    id="invest-account-password"
                    email={form.email}
                    checked={investCreateAccount}
                    password={investPassword}
                    onCheckedChange={setInvestCreateAccount}
                    onPasswordChange={setInvestPassword}
                    disabled={!configured}
                    signedIn={Boolean(user)}
                  />
                </>
              ) : wizard.currentStep === 0 ? (
                <InvestmentFieldset title="Basic Details">
                  <InvestmentTextInput id="investment-fullName" label="Full Name" value={form.fullName} onChange={(value) => { setField('fullName', value); wizard.clearError(); }} required autoComplete="name" />
                  <InvestmentTextInput id="investment-email" label="Email Address" value={form.email} onChange={(value) => { setField('email', value); wizard.clearError(); }} required type="email" autoComplete="email" />
                  <InvestmentTextInput id="investment-phone" label="Phone Number" value={form.phone} onChange={(value) => { setField('phone', value); wizard.clearError(); }} required type="tel" autoComplete="tel" />
                  <InvestmentRadioGroup name="investment-preferredContact" label="Preferred Contact Method" value={form.preferredContact} onChange={(value) => setField('preferredContact', value)} options={['Email', 'Phone', 'Either']} />
                </InvestmentFieldset>
              ) : wizard.currentStep === 1 ? (
                <InvestmentFieldset title="What are you looking for?">
                  <InvestmentCheckboxGroup name="investment-serviceInterest" label="What would you like help with?" values={form.serviceInterest} onChange={(value) => { setField('serviceInterest', value); wizard.clearError(); }} options={serviceOptions} required />
                </InvestmentFieldset>
              ) : wizard.currentStep === 2 ? (
                <InvestmentFieldset title="Property Details">
                  <InvestmentRadioGroup name="investment-propertyOwnership" label="Do you currently own the property?" value={form.propertyOwnership} onChange={(value) => setField('propertyOwnership', value)} options={['Yes', 'In the process of buying', 'No, but I am exploring options']} />
                  {hasProperty ? (
                    <div className="conditional-panel">
                      <InvestmentTextInput id="investment-propertyAddressOrArea" label="Property Address or Area" value={form.propertyAddressOrArea} onChange={(value) => setField('propertyAddressOrArea', value)} />
                      <InvestmentRadioGroup name="investment-propertyType" label="Property Type" value={form.propertyType} onChange={(value) => setField('propertyType', value)} options={['Flat', 'House', 'HMO', 'Other']} />
                      <InvestmentTextInput id="investment-bedrooms" label="Number of Bedrooms" value={form.bedrooms} onChange={(value) => setField('bedrooms', value)} />
                      <InvestmentRadioGroup name="investment-occupied" label="Is the property currently occupied?" value={form.occupied} onChange={(value) => setField('occupied', value)} options={['Yes', 'No']} />
                    </div>
                  ) : null}
                </InvestmentFieldset>
              ) : wizard.currentStep === 3 ? (
                <InvestmentFieldset title="Let Type">
                  <InvestmentRadioGroup name="investment-letType" label="What type of let are you interested in?" value={form.letType} onChange={(value) => setField('letType', value)} options={['Short Term Let', 'Long Term Let', 'Not sure yet']} />
                  {showShortTerm ? (
                    <div className="conditional-panel">
                      <InvestmentRadioGroup name="investment-shortTermOperated" label="Have you already operated as a short term let?" value={form.shortTermOperated} onChange={(value) => setField('shortTermOperated', value)} options={['Yes', 'No']} />
                      <InvestmentRadioGroup name="investment-shortTermLicenceStatus" label="Do you currently have a licence or applied for one?" value={form.shortTermLicenceStatus} onChange={(value) => setField('shortTermLicenceStatus', value)} options={['Yes', 'In progress', 'No']} />
                      <InvestmentCheckboxGroup name="investment-platforms" label="Which platforms are you using or planning to use?" values={form.platforms} onChange={(value) => setField('platforms', value)} options={['Airbnb', 'Booking.com', 'Direct bookings', 'Not sure yet']} />
                    </div>
                  ) : null}
                  {showLongTerm ? (
                    <div className="conditional-panel">
                      <InvestmentRadioGroup name="investment-currentlyRented" label="Is the property currently rented?" value={form.currentlyRented} onChange={(value) => setField('currentlyRented', value)} options={['Yes', 'No']} />
                      <InvestmentRadioGroup name="investment-managementType" label="Are you looking for full management or tenant find only?" value={form.managementType} onChange={(value) => setField('managementType', value)} options={['Full management', 'Tenant find only', 'Not sure yet']} />
                    </div>
                  ) : null}
                </InvestmentFieldset>
              ) : wizard.currentStep === 4 ? (
                <InvestmentFieldset title="Advertising and Website Support">
                  <InvestmentRadioGroup name="investment-advertisingHelp" label="Do you want help advertising your property?" value={form.advertisingHelp} onChange={(value) => setField('advertisingHelp', value)} options={['Yes', 'No']} />
                  {showAdvertising ? (
                    <div className="conditional-panel">
                      <InvestmentCheckboxGroup name="investment-advertisedWhere" label="Where is it currently advertised?" values={form.advertisedWhere} onChange={(value) => setField('advertisedWhere', value)} options={['Not advertised yet', 'Rightmove', 'Zoopla', 'Airbnb', 'Other']} />
                    </div>
                  ) : null}
                  <InvestmentRadioGroup name="investment-websiteHelp" label="Do you want a website for your property?" value={form.websiteHelp} onChange={(value) => setField('websiteHelp', value)} options={['Yes', 'No', 'Not sure']} />
                  {showWebsite ? (
                    <div className="conditional-panel">
                      <InvestmentCheckboxGroup name="investment-websiteGoals" label="What would you like the website to do?" values={form.websiteGoals} onChange={(value) => setField('websiteGoals', value)} options={['Take direct bookings', 'Showcase the property', 'Collect enquiries', 'All of the above']} />
                    </div>
                  ) : null}
                </InvestmentFieldset>
              ) : wizard.currentStep === 5 ? (
                <InvestmentFieldset title="Portfolio / Investment Interest">
                  <InvestmentRadioGroup name="investment-interest" label="Are you looking to:" value={form.investmentInterest} onChange={(value) => setField('investmentInterest', value)} options={['Sell a property', 'Partner on an investment', 'Introduce an opportunity', 'Just have a conversation']} />
                  {showPortfolioDetails ? (
                    <div className="conditional-panel">
                      <InvestmentTextInput id="investment-estimatedValue" label="Estimated property value" value={form.estimatedValue} onChange={(value) => setField('estimatedValue', value)} />
                      <InvestmentTextInput id="investment-timeline" label="Expected timeline" value={form.timeline} onChange={(value) => setField('timeline', value)} />
                    </div>
                  ) : null}
                </InvestmentFieldset>
              ) : wizard.currentStep === 6 ? (
                <InvestmentFieldset title="Your Goals">
                  <InvestmentCheckboxGroup name="investment-goals" label="What are you hoping to achieve?" values={form.goals} onChange={(value) => setField('goals', value)} options={goalOptions} />
                </InvestmentFieldset>
              ) : wizard.currentStep === 7 ? (
                <InvestmentFieldset title="Additional Information">
                  <InvestmentTextArea id="investment-message" label="Tell us a bit more about what you are looking for" value={form.message} onChange={(value) => { setField('message', value); wizard.clearError(); }} required />
                </InvestmentFieldset>
              ) : (
                <InvestmentFieldset title="Final Step">
                  <InvestmentRadioGroup name="investment-moveForward" label="How soon are you looking to move forward?" value={form.moveForward} onChange={(value) => setField('moveForward', value)} options={['Immediately', 'Within 1 to 3 months', 'Just exploring']} />
                </InvestmentFieldset>
              )}
            </MultiStepFormWrapper>
            {status === 'error' ? <p className="error-text" role="alert" style={{ marginTop: '0.75rem' }}>{errorMessage || 'Unable to submit investment enquiry right now.'}</p> : null}
          </form>
        )}
      </Section>
    </>
  );
}
