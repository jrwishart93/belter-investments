import { FormEvent, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ClipboardList, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AccountUpgradePrompt } from '../components/AccountUpgradePrompt';
import { MultiStepFormWrapper, WizardReviewScreen } from '../components/MultiStepFormWrapper';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import { submitDetailedEnquiry, submitQuickMessage, type EnquirySection } from '../lib/forms';

type DetailedFormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  preferredContact: string;
  preferredContactTime: string;
  propertyInterest: string;
  selectedProperties: string[];
  propertySearchDetails: string;
  enquiringForSelf: string;
  enquiryOnBehalfOf: string;
  relationshipToApplicant: string;
  moveInDate: string;
  rentalPeriod: string;
  flexibleDates: string;
  flexibilityDetails: string;
  shortTermReason: string;
  occupants: string;
  occupantDetails: string;
  occupantRelationship: string;
  occupantRelationshipOther: string;
  occupancyMoreThanFour: string;
  allAdults: string;
  childrenDetails: string;
  employmentStatus: string;
  occupation: string;
  employer: string;
  roleLength: string;
  selfEmployedWork: string;
  selfEmployedLength: string;
  proofOfIncomeSelfEmployed: string;
  unemployedSituation: string;
  rentPaymentPlan: string;
  student: string;
  studySubject: string;
  university: string;
  studyStage: string;
  studentGuarantor: string;
  rentPaidBy: string;
  jointTenantsNamed: string;
  guarantorAvailable: string;
  guarantorDetails: string;
  employerCompanyDetails: string;
  workRelocation: string;
  rentPaymentOther: string;
  supportingDocuments: string;
  liveInEdinburgh: string;
  edinburghArea: string;
  movingFrom: string;
  workOrStudyEdinburgh: string;
  moveReason: string;
  moveReasonOther: string;
  movingToEdinburghDetails: string;
  viewingPreference: string;
  viewingBestTime: string;
  viewingDifficultTimes: string;
  viewingAvailability: string;
  contactIfSuitable: string;
  currentlyRenting: string;
  currentTenancyLength: string;
  reasonForMoving: string;
  tenancyEndingSoon: string;
  currentLivingSituation: string;
  landlordReferences: string;
  comfortableProvidingReferences: string;
  noReferencesContext: string;
  rentedBefore: string;
  rentedBeforeContext: string;
  pets: string;
  petType: string;
  petCount: string;
  petBreed: string;
  petAge: string;
  houseTrained: string;
  rentedWithPetBefore: string;
  petDetails: string;
  smoking: string;
  smokingDetails: string;
  parking: string;
  parkingRequirements: string;
  accessibilityRequirements: string;
  accessibilityDetails: string;
  additionalInfo: string;
  propertyQuestions: string;
  leadSource: string;
  leadSourceOther: string;
};

type FormField = {
  label: string;
  value: string;
};

const initialDetailedState: DetailedFormState = {
  fullName: '',
  email: '',
  contactNumber: '',
  preferredContact: '',
  preferredContactTime: '',
  propertyInterest: '',
  selectedProperties: [],
  propertySearchDetails: '',
  enquiringForSelf: '',
  enquiryOnBehalfOf: '',
  relationshipToApplicant: '',
  moveInDate: '',
  rentalPeriod: '',
  flexibleDates: '',
  flexibilityDetails: '',
  shortTermReason: '',
  occupants: '',
  occupantDetails: '',
  occupantRelationship: '',
  occupantRelationshipOther: '',
  occupancyMoreThanFour: '',
  allAdults: '',
  childrenDetails: '',
  employmentStatus: '',
  occupation: '',
  employer: '',
  roleLength: '',
  selfEmployedWork: '',
  selfEmployedLength: '',
  proofOfIncomeSelfEmployed: '',
  unemployedSituation: '',
  rentPaymentPlan: '',
  student: '',
  studySubject: '',
  university: '',
  studyStage: '',
  studentGuarantor: '',
  rentPaidBy: '',
  jointTenantsNamed: '',
  guarantorAvailable: '',
  guarantorDetails: '',
  employerCompanyDetails: '',
  workRelocation: '',
  rentPaymentOther: '',
  supportingDocuments: '',
  liveInEdinburgh: '',
  edinburghArea: '',
  movingFrom: '',
  workOrStudyEdinburgh: '',
  moveReason: '',
  moveReasonOther: '',
  movingToEdinburghDetails: '',
  viewingPreference: '',
  viewingBestTime: '',
  viewingDifficultTimes: '',
  viewingAvailability: '',
  contactIfSuitable: '',
  currentlyRenting: '',
  currentTenancyLength: '',
  reasonForMoving: '',
  tenancyEndingSoon: '',
  currentLivingSituation: '',
  landlordReferences: '',
  comfortableProvidingReferences: '',
  noReferencesContext: '',
  rentedBefore: '',
  rentedBeforeContext: '',
  pets: '',
  petType: '',
  petCount: '',
  petBreed: '',
  petAge: '',
  houseTrained: '',
  rentedWithPetBefore: '',
  petDetails: '',
  smoking: '',
  smokingDetails: '',
  parking: '',
  parkingRequirements: '',
  accessibilityRequirements: '',
  accessibilityDetails: '',
  additionalInfo: '',
  propertyQuestions: '',
  leadSource: '',
  leadSourceOther: ''
};

const yesNoOptions = ['Yes', 'No'];
const propertyOptions = ['61/1 Caledonian Crescent', 'Albany Street Short-Term Let', 'Royal Crescent', 'Montgomery Street'];
const rentalPeriods = ['1 to 3 months', '3 to 6 months', '6 to 12 months', '1 to 2 years', '2 years or longer'];
const occupants = ['1 person', '2 persons', '3 persons', '4 persons', 'More than 4'];
const leadSources = ['Facebook', 'Instagram', 'Gumtree', 'OpenRent', 'Zoopla', 'Word of mouth', 'Other'];

const addField = (fields: FormField[], label: string, value: string | string[]) => {
  const displayValue = Array.isArray(value) ? value.join(', ') : value;
  if (displayValue.trim()) {
    fields.push({ label, value: displayValue });
  }
};

function ConditionalBlock({ children }: { children: ReactNode }) {
  return <div className="conditional-panel">{children}</div>;
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="form-section-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

function TextInput({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <input id={id} name={name ?? id} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} autoComplete={autoComplete} />
    </div>
  );
}

function TextAreaField({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  rows = 3,
  helper
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  helper?: string;
}) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <textarea id={id} name={name ?? id} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      {helper ? <p className="form-helper">{helper}</p> : null}
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <select id={id} name={name ?? id} value={value} onChange={(event) => onChange(event.target.value)} required={required}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({
  name,
  label,
  value,
  onChange,
  options,
  required = false
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
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

function CheckboxGroup({
  name,
  label,
  values,
  onChange,
  options,
  required = false
}: {
  name: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
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
      {required && values.length === 0 ? <p className="form-helper">Choose at least one option.</p> : null}
    </div>
  );
}


export function EnquiryPage() {
  const { configured, register, user } = useAuth();
  const navigate = useNavigate();

  // Quick Message state
  const [quickStatus, setQuickStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [quickError, setQuickError] = useState('');
  const [quickCreateAccount, setQuickCreateAccount] = useState(false);
  const [quickPassword, setQuickPassword] = useState('');
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickContactNumber, setQuickContactNumber] = useState('');
  const [quickMessage, setQuickMessage] = useState('');

  // Detailed Rental state
  const [detailedStatus, setDetailedStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [detailedError, setDetailedError] = useState('');
  const [detailedSuccessMessage, setDetailedSuccessMessage] = useState('');
  const [detailedCreateAccount, setDetailedCreateAccount] = useState(false);
  const [detailedPassword, setDetailedPassword] = useState('');
  const [detailedForm, setDetailedForm] = useState<DetailedFormState>(initialDetailedState);

  const setField = <K extends keyof DetailedFormState>(field: K, value: DetailedFormState[K]) => {
    setDetailedForm((current) => ({ ...current, [field]: value }));
  };

  // Quick Message wizard
  const quickValidators = useMemo(() => [
    () => {
      if (!quickName.trim()) return 'Please add your full name.';
      if (!quickEmail.trim()) return 'Please add your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quickEmail)) return 'Please add a valid email address.';
      if (!quickContactNumber.trim()) return 'Please add your contact number.';
      return '';
    },
    () => {
      if (!quickMessage.trim()) return 'Please add your message.';
      return '';
    }
  ], [quickName, quickEmail, quickContactNumber, quickMessage]);

  const quickWizard = useMultiStepForm(2, quickValidators);

  const usesPhoneContact = detailedForm.preferredContact === 'Phone' || detailedForm.preferredContact === 'Either';
  const shorterTerm = detailedForm.rentalPeriod === '1 to 3 months' || detailedForm.rentalPeriod === '3 to 6 months';
  const multipleOccupants = ['2 persons', '3 persons', '4 persons', 'More than 4'].includes(detailedForm.occupants);
  const fullOrPartTime = detailedForm.employmentStatus === 'Yes, full-time' || detailedForm.employmentStatus === 'Yes, part-time';
  const dogOrCat = detailedForm.petType === 'Dog' || detailedForm.petType === 'Cat';
  const smallPet = ['Rabbit', 'Guinea pig', 'Hamster', 'Bird', 'Fish', 'Reptile', 'Other'].includes(detailedForm.petType);
  const wantsViewing = detailedForm.viewingPreference === 'Yes, in person' || detailedForm.viewingPreference === 'Yes, virtual';

  // Detailed Rental wizard — 10 steps (A–J)
  const detailedStepTitles = [
    'Personal Details',
    'Property Interest',
    'Tenancy Timing',
    'Occupancy',
    'Employment and Study',
    'Edinburgh / Relocation Background',
    'Viewing Preferences',
    'Rental History',
    'Pets, Smoking and Practical Matters',
    'Additional Information'
  ];

  const detailedValidators = useMemo(() => [
    // Step 0 – Personal Details
    () => {
      if (!detailedForm.fullName.trim()) return 'Please add your full name.';
      if (!detailedForm.email.trim()) return 'Please add your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detailedForm.email)) return 'Please add a valid email address.';
      if (!detailedForm.contactNumber.trim()) return 'Please add your contact number.';
      if (!detailedForm.preferredContact) return 'Please choose a preferred contact method.';
      if (usesPhoneContact && !detailedForm.preferredContactTime) return 'Please choose a preferred time to contact you.';
      return '';
    },
    // Step 1 – Property Interest
    () => {
      if (!detailedForm.propertyInterest) return 'Please choose which property you are enquiring about.';
      if (detailedForm.propertyInterest === 'More than one property' && detailedForm.selectedProperties.length === 0) return 'Please choose at least one property you are interested in.';
      if (detailedForm.propertyInterest === 'Not sure yet' && !detailedForm.propertySearchDetails.trim()) return 'Please tell us what type of property you are looking for.';
      if (!detailedForm.enquiringForSelf) return 'Please tell us whether you are enquiring for yourself.';
      if (detailedForm.enquiringForSelf === 'No' && !detailedForm.enquiryOnBehalfOf.trim()) return 'Please tell us who you are enquiring on behalf of.';
      if (detailedForm.enquiringForSelf === 'No' && !detailedForm.relationshipToApplicant.trim()) return 'Please tell us your relationship to them.';
      return '';
    },
    // Step 2 – Tenancy Timing
    () => {
      if (!detailedForm.moveInDate) return 'Please add your ideal move-in date.';
      if (!detailedForm.rentalPeriod) return 'Please choose how long you would like to rent for.';
      if (!detailedForm.flexibleDates) return 'Please tell us whether your move-in dates are flexible.';
      return '';
    },
    // Step 3 – Occupancy
    () => {
      if (!detailedForm.occupants) return 'Please tell us how many people would be moving in.';
      return '';
    },
    // Step 4 – Employment and Study
    () => {
      if (!detailedForm.employmentStatus) return 'Please tell us your employment status.';
      if (!detailedForm.rentPaidBy) return 'Please tell us who would pay the rent.';
      if (!detailedForm.supportingDocuments) return 'Please answer the supporting documents question.';
      return '';
    },
    // Steps 5–9 – optional
    () => '',
    () => '',
    () => '',
    () => '',
    () => ''
  ], [detailedForm, usesPhoneContact]);

  const detailedWizard = useMultiStepForm(10, detailedValidators);

  async function handleQuickMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (quickCreateAccount && !user && quickPassword.length < 8) {
      setQuickStatus('error');
      setQuickError('Please add a password with at least 8 characters, or submit as a guest.');
      return;
    }

    setQuickStatus('loading');
    setQuickError('');

    try {
      const accountUser = quickCreateAccount && !user
        ? await register({ fullName: quickName, email: quickEmail, phone: quickContactNumber, password: quickPassword })
        : user;
      const authIdToken = accountUser ? await accountUser.getIdToken() : undefined;

      await submitQuickMessage({
        name: quickName,
        email: quickEmail,
        contactNumber: quickContactNumber,
        message: quickMessage,
        authIdToken,
        accountCreated: Boolean(quickCreateAccount || user)
      });
      setQuickName('');
      setQuickEmail('');
      setQuickContactNumber('');
      setQuickMessage('');
      setQuickStatus('success');
      setQuickPassword('');
      setQuickCreateAccount(false);
      if (quickCreateAccount && !user) {
        navigate('/portal');
      }
    } catch {
      setQuickError('Unable to send right now. Please try again shortly.');
      setQuickStatus('error');
    }
  }

  function buildDetailedSections(): EnquirySection[] {
    const sections: EnquirySection[] = [];
    const section = (title: string, fields: FormField[]) => {
      if (fields.length > 0) {
        sections.push({ title, fields });
      }
    };

    const personal: FormField[] = [];
    addField(personal, 'Full Name', detailedForm.fullName);
    addField(personal, 'Email Address', detailedForm.email);
    addField(personal, 'Contact Number', detailedForm.contactNumber);
    addField(personal, 'Preferred Method of Contact', detailedForm.preferredContact);
    if (usesPhoneContact) addField(personal, 'Preferred time to contact you', detailedForm.preferredContactTime);
    section('Personal Details', personal);

    const propertyInterest: FormField[] = [];
    addField(propertyInterest, 'Which property are you enquiring about?', detailedForm.propertyInterest);
    if (detailedForm.propertyInterest === 'More than one property') addField(propertyInterest, 'Selected properties', detailedForm.selectedProperties);
    if (detailedForm.propertyInterest === 'Not sure yet') addField(propertyInterest, 'Property type sought', detailedForm.propertySearchDetails);
    addField(propertyInterest, 'Are you enquiring for yourself?', detailedForm.enquiringForSelf);
    if (detailedForm.enquiringForSelf === 'No') {
      addField(propertyInterest, 'Who are you enquiring on behalf of?', detailedForm.enquiryOnBehalfOf);
      addField(propertyInterest, 'Relationship to them', detailedForm.relationshipToApplicant);
    }
    section('Property Interest', propertyInterest);

    const tenancy: FormField[] = [];
    addField(tenancy, 'When would you ideally like to move in?', detailedForm.moveInDate);
    addField(tenancy, 'How long would you like to rent for?', detailedForm.rentalPeriod);
    addField(tenancy, 'Are your move-in dates flexible?', detailedForm.flexibleDates);
    if (detailedForm.flexibleDates === 'Yes') addField(tenancy, 'Flexibility details', detailedForm.flexibilityDetails);
    if (shorterTerm) addField(tenancy, 'Shorter-term rental reason', detailedForm.shortTermReason);
    section('Tenancy Timing', tenancy);

    const occupancy: FormField[] = [];
    addField(occupancy, 'How many people would be moving in?', detailedForm.occupants);
    if (multipleOccupants) {
      addField(occupancy, 'Who would be living at the property?', detailedForm.occupantDetails);
      addField(occupancy, 'Relationship to other occupants', detailedForm.occupantRelationship);
    }
    if (detailedForm.occupantRelationship === 'Other') addField(occupancy, 'Other relationship detail', detailedForm.occupantRelationshipOther);
    if (detailedForm.occupants === 'More than 4') addField(occupancy, 'Full occupancy details', detailedForm.occupancyMoreThanFour);
    addField(occupancy, 'Will all occupants be adults?', detailedForm.allAdults);
    if (detailedForm.allAdults === 'No') addField(occupancy, 'Children/dependants details', detailedForm.childrenDetails);
    section('Occupancy', occupancy);

    const employment: FormField[] = [];
    addField(employment, 'Are you currently employed?', detailedForm.employmentStatus);
    if (fullOrPartTime) {
      addField(employment, 'Occupation', detailedForm.occupation);
      addField(employment, 'Employer', detailedForm.employer);
      addField(employment, 'Length in role', detailedForm.roleLength);
    }
    if (detailedForm.employmentStatus === 'Self-employed') {
      addField(employment, 'Type of work', detailedForm.selfEmployedWork);
      addField(employment, 'Length self-employed', detailedForm.selfEmployedLength);
      addField(employment, 'Able to provide proof of income', detailedForm.proofOfIncomeSelfEmployed);
    }
    if (detailedForm.employmentStatus === 'No') {
      addField(employment, 'Current situation', detailedForm.unemployedSituation);
      addField(employment, 'How rent would be paid', detailedForm.rentPaymentPlan);
    }
    addField(employment, 'Are you a student?', detailedForm.student);
    if (detailedForm.student === 'Yes') {
      addField(employment, 'Study subject', detailedForm.studySubject);
      addField(employment, 'University or college', detailedForm.university);
      addField(employment, 'Stage of study', detailedForm.studyStage);
      addField(employment, 'Guarantor if required', detailedForm.studentGuarantor);
    }
    addField(employment, 'Rent paid by', detailedForm.rentPaidBy);
    if (detailedForm.rentPaidBy === 'Joint tenants') addField(employment, 'All joint tenants named on tenancy', detailedForm.jointTenantsNamed);
    if (detailedForm.rentPaidBy === 'Guarantor / family support') {
      addField(employment, 'Guarantor available', detailedForm.guarantorAvailable);
      addField(employment, 'Guarantor details', detailedForm.guarantorDetails);
    }
    if (detailedForm.rentPaidBy === 'Employer / company') {
      addField(employment, 'Employer or company details', detailedForm.employerCompanyDetails);
      addField(employment, 'Work relocation', detailedForm.workRelocation);
    }
    if (detailedForm.rentPaidBy === 'Other') addField(employment, 'Rent payment explanation', detailedForm.rentPaymentOther);
    addField(employment, 'Comfortable providing supporting documents', detailedForm.supportingDocuments);
    section('Employment and Study', employment);

    const relocation: FormField[] = [];
    addField(relocation, 'Do you currently live in Edinburgh?', detailedForm.liveInEdinburgh);
    if (detailedForm.liveInEdinburgh === 'Yes') addField(relocation, 'Current Edinburgh area', detailedForm.edinburghArea);
    if (detailedForm.liveInEdinburgh === 'No') addField(relocation, 'Moving from', detailedForm.movingFrom);
    addField(relocation, 'Do you currently work or study in Edinburgh?', detailedForm.workOrStudyEdinburgh);
    if (detailedForm.workOrStudyEdinburgh === 'No') addField(relocation, 'Reason for moving to Edinburgh', detailedForm.moveReason);
    if (detailedForm.moveReason === 'Other') addField(relocation, 'Other move reason', detailedForm.moveReasonOther);
    addField(relocation, 'Why moving to Edinburgh', detailedForm.movingToEdinburghDetails);
    section('Edinburgh / Relocation Background', relocation);

    const viewing: FormField[] = [];
    addField(viewing, 'Would you like to arrange a viewing?', detailedForm.viewingPreference);
    if (wantsViewing) {
      addField(viewing, 'When would suit best?', detailedForm.viewingBestTime);
      addField(viewing, 'Difficult days or times', detailedForm.viewingDifficultTimes);
      addField(viewing, 'Weekday or weekend availability', detailedForm.viewingAvailability);
    }
    if (detailedForm.viewingPreference === 'Not at this stage') addField(viewing, 'Contact if property appears suitable', detailedForm.contactIfSuitable);
    section('Viewing Preferences', viewing);

    const history: FormField[] = [];
    addField(history, 'Are you currently renting?', detailedForm.currentlyRenting);
    if (detailedForm.currentlyRenting === 'Yes') {
      addField(history, 'Length at current property', detailedForm.currentTenancyLength);
      addField(history, 'Reason for moving', detailedForm.reasonForMoving);
      addField(history, 'Current tenancy ending soon', detailedForm.tenancyEndingSoon);
    }
    if (detailedForm.currentlyRenting === 'No') addField(history, 'Current living situation', detailedForm.currentLivingSituation);
    addField(history, 'References from previous landlords or letting agents', detailedForm.landlordReferences);
    if (detailedForm.landlordReferences === 'Yes') addField(history, 'Comfortable providing references', detailedForm.comfortableProvidingReferences);
    if (detailedForm.landlordReferences === 'No') addField(history, 'References context', detailedForm.noReferencesContext);
    addField(history, 'Have you rented before?', detailedForm.rentedBefore);
    if (detailedForm.rentedBefore === 'No') addField(history, 'Rented before context', detailedForm.rentedBeforeContext);
    section('Rental History', history);

    const practical: FormField[] = [];
    addField(practical, 'Pets or intended pets', detailedForm.pets);
    if (detailedForm.pets === 'Yes') addField(practical, 'Pet type', detailedForm.petType);
    if (dogOrCat) {
      addField(practical, 'How many?', detailedForm.petCount);
      addField(practical, 'Breed', detailedForm.petBreed);
      addField(practical, 'Age', detailedForm.petAge);
      addField(practical, 'House trained', detailedForm.houseTrained);
      addField(practical, 'Lived in rented accommodation before', detailedForm.rentedWithPetBefore);
    }
    if (smallPet) {
      addField(practical, 'How many?', detailedForm.petCount);
      addField(practical, 'Pet details', detailedForm.petDetails);
    }
    addField(practical, 'Smoking', detailedForm.smoking);
    if (detailedForm.smoking === 'Yes') addField(practical, 'Smoking details', detailedForm.smokingDetails);
    addField(practical, 'Parking required', detailedForm.parking);
    if (detailedForm.parking === 'Yes') addField(practical, 'Parking requirements', detailedForm.parkingRequirements);
    addField(practical, 'Accessibility or practical requirements', detailedForm.accessibilityRequirements);
    if (detailedForm.accessibilityRequirements === 'Yes') addField(practical, 'Accessibility details', detailedForm.accessibilityDetails);
    section('Pets, Smoking and Practical Matters', practical);

    const additional: FormField[] = [];
    addField(additional, 'Anything else to know', detailedForm.additionalInfo);
    addField(additional, 'Questions about the property', detailedForm.propertyQuestions);
    addField(additional, 'Where did you hear about this property?', detailedForm.leadSource);
    if (detailedForm.leadSource === 'Other') addField(additional, 'Lead source other', detailedForm.leadSourceOther);
    section('Additional Information', additional);

    return sections;
  }

  async function handleDetailedEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (detailedCreateAccount && !user && detailedPassword.length < 8) {
      setDetailedStatus('error');
      setDetailedError('Please add a password with at least 8 characters, or submit as a guest.');
      return;
    }

    setDetailedStatus('loading');
    setDetailedError('');
    setDetailedSuccessMessage('');

    try {
      const accountUser = detailedCreateAccount && !user
        ? await register({
            fullName: detailedForm.fullName,
            email: detailedForm.email,
            phone: detailedForm.contactNumber,
            password: detailedPassword
          })
        : user;
      const authIdToken = accountUser ? await accountUser.getIdToken() : undefined;

      const result = await submitDetailedEnquiry({
        fullName: detailedForm.fullName,
        email: detailedForm.email,
        contactNumber: detailedForm.contactNumber,
        sections: buildDetailedSections(),
        authIdToken,
        accountCreated: Boolean(detailedCreateAccount || user)
      });
      setDetailedForm(initialDetailedState);
      setDetailedPassword('');
      setDetailedCreateAccount(false);
      setDetailedSuccessMessage(
        result.applicantEmailSent === false
          ? 'Thanks, your detailed enquiry has been received. We could not send the confirmation email, so please check the email address you entered or contact us if you need a copy.'
          : "Thanks, we'll be in touch shortly. A copy of your enquiry has been sent to your email."
      );
      setDetailedStatus('success');
      if (detailedCreateAccount && !user) {
        navigate('/portal');
      }
    } catch (error) {
      setDetailedError(
        error instanceof Error
          ? error.message
          : 'Unable to send your detailed enquiry right now. Please check your details and try again shortly.'
      );
      setDetailedStatus('error');
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Belter Enquiries"
        title="Enquiry"
        subtitle="Send a quick message or complete a detailed rental enquiry so we can understand your property requirements."
      />

      <Section title="Choose an enquiry option" intro="Use the quick form for a straightforward question, or the detailed rental enquiry for viewings and tenancy pre-screening.">
        <div className="enquiry-pathways enquiry-pathways--two cards-grid">
          <a className="info-card enquiry-pathway" href="#quick-message">
            <span className="enquiry-pathway__icon" aria-hidden="true">
              <MessageCircle size={22} strokeWidth={1.8} />
            </span>
            <p className="eyebrow">Quick Message</p>
            <h3>A simple question or short note</h3>
            <p>Best if you want to ask something quickly without completing the full rental form.</p>
            <span className="text-link" aria-hidden="true">Go to quick message</span>
          </a>
          <a className="info-card enquiry-pathway" href="#detailed-rental-enquiry">
            <span className="enquiry-pathway__icon" aria-hidden="true">
              <ClipboardList size={22} strokeWidth={1.8} />
            </span>
            <p className="eyebrow">Detailed Rental Enquiry</p>
            <h3>Viewing, suitability, and tenancy details</h3>
            <p>A guided form that only shows follow-up questions when they are relevant.</p>
            <span className="text-link" aria-hidden="true">Go to detailed form</span>
          </a>
        </div>
      </Section>

      <Section
        id="quick-message"
        title="Quick Message"
        intro="For users who just want to ask a straightforward question."
      >
        {quickStatus === 'success' ? (
          <p className="success-text" role="status" aria-live="polite">Thanks, we'll be in touch shortly.</p>
        ) : (
          <form className="enquiry-form" onSubmit={handleQuickMessage} noValidate>
            <MultiStepFormWrapper
              currentStep={quickWizard.currentStep}
              direction={quickWizard.direction}
              isReviewing={quickWizard.isReviewing}
              fromReview={quickWizard.fromReview}
              stepError={quickWizard.stepError}
              progress={quickWizard.progress}
              totalSteps={2}
              stepLabel={quickWizard.isReviewing ? undefined : quickWizard.currentStep === 0 ? 'Step 1 of 2 — Your Details' : 'Step 2 of 2 — Your Message'}
              onNext={quickWizard.goNext}
              onBack={quickWizard.goBack}
              submitLabel="Send message"
              submitDisabled={quickStatus === 'loading'}
            >
              {quickWizard.isReviewing ? (
                <WizardReviewScreen
                  sections={[
                    { title: 'Your Details', fields: [{ label: 'Full Name', value: quickName }, { label: 'Email Address', value: quickEmail }, { label: 'Contact Number', value: quickContactNumber }].filter((f) => f.value.trim()) },
                    { title: 'Your Message', fields: [{ label: 'Message', value: quickMessage }].filter((f) => f.value.trim()) }
                  ]}
                  onEdit={quickWizard.editStep}
                  stepTitles={['Your Details', 'Your Message']}
                />
              ) : quickWizard.currentStep === 0 ? (
                <fieldset className="form-section-group">
                  <legend>Your Details</legend>
                  <div className="field-group">
                    <label htmlFor="quick-name">Full Name <span aria-hidden="true">*</span></label>
                    <input id="quick-name" type="text" value={quickName} onChange={(e) => { setQuickName(e.target.value); quickWizard.clearError(); }} autoComplete="name" />
                  </div>
                  <div className="field-group">
                    <label htmlFor="quick-email">Email Address <span aria-hidden="true">*</span></label>
                    <input id="quick-email" type="email" value={quickEmail} onChange={(e) => { setQuickEmail(e.target.value); quickWizard.clearError(); }} autoComplete="email" />
                  </div>
                  <div className="field-group">
                    <label htmlFor="quick-contactNumber">Contact Number <span aria-hidden="true">*</span></label>
                    <input id="quick-contactNumber" type="tel" value={quickContactNumber} onChange={(e) => { setQuickContactNumber(e.target.value); quickWizard.clearError(); }} autoComplete="tel" />
                  </div>
                </fieldset>
              ) : (
                <fieldset className="form-section-group">
                  <legend>Your Message</legend>
                  <div className="field-group">
                    <label htmlFor="quick-message">Message <span aria-hidden="true">*</span></label>
                    <textarea id="quick-message" rows={5} value={quickMessage} onChange={(e) => { setQuickMessage(e.target.value); quickWizard.clearError(); }} />
                  </div>
                </fieldset>
              )}
              {quickWizard.isReviewing ? (
                <AccountUpgradePrompt
                  id="quick-account-password"
                  email={quickEmail}
                  checked={quickCreateAccount}
                  password={quickPassword}
                  onCheckedChange={setQuickCreateAccount}
                  onPasswordChange={setQuickPassword}
                  disabled={!configured}
                  signedIn={Boolean(user)}
                />
              ) : null}
            </MultiStepFormWrapper>
            {quickStatus === 'error' ? <p className="error-text" role="alert" aria-live="assertive" style={{ marginTop: '0.75rem' }}>{quickError || 'Unable to send right now. Please try again shortly.'}</p> : null}
          </form>
        )}
      </Section>

      <Section
        id="detailed-rental-enquiry"
        title="Detailed Rental Enquiry"
        intro="A guided rental enquiry that gathers useful pre-screening information without showing every question at once."
      >
        <span id="property-enquiry" className="anchor-offset" aria-hidden="true" />
        {detailedStatus === 'success' ? (
          <p
            className={detailedSuccessMessage.includes('could not send') ? 'warning-text' : 'success-text'}
            role="status"
            aria-live="polite"
          >
            {detailedSuccessMessage || "Thanks, we'll be in touch shortly."}
          </p>
        ) : (
          <form className="enquiry-form enquiry-form--detailed" onSubmit={handleDetailedEnquiry} noValidate>
            <MultiStepFormWrapper
              currentStep={detailedWizard.currentStep}
              direction={detailedWizard.direction}
              isReviewing={detailedWizard.isReviewing}
              fromReview={detailedWizard.fromReview}
              stepError={detailedWizard.stepError}
              progress={detailedWizard.progress}
              totalSteps={10}
              stepLabel={detailedWizard.isReviewing ? undefined : `Step ${detailedWizard.currentStep + 1} of 10 — ${detailedStepTitles[detailedWizard.currentStep]}`}
              onNext={detailedWizard.goNext}
              onBack={detailedWizard.goBack}
              submitLabel="Submit Detailed Rental Enquiry"
              submitDisabled={detailedStatus === 'loading'}
            >
              {detailedWizard.isReviewing ? (
                <>
                  <WizardReviewScreen
                    sections={buildDetailedSections()}
                    onEdit={detailedWizard.editStep}
                    stepTitles={detailedStepTitles}
                  />
                  <AccountUpgradePrompt
                    id="detailed-account-password"
                    email={detailedForm.email}
                    checked={detailedCreateAccount}
                    password={detailedPassword}
                    onCheckedChange={setDetailedCreateAccount}
                    onPasswordChange={setDetailedPassword}
                    disabled={!configured}
                    signedIn={Boolean(user)}
                  />
                </>
              ) : detailedWizard.currentStep === 0 ? (
                <FieldGroup title="A. Personal Details">
                  <TextInput id="detailed-fullName" name="fullName" label="Full Name" value={detailedForm.fullName} onChange={(value) => { setField('fullName', value); detailedWizard.clearError(); }} required autoComplete="name" />
                  <TextInput id="detailed-email" name="email" label="Email Address" value={detailedForm.email} onChange={(value) => { setField('email', value); detailedWizard.clearError(); }} type="email" required autoComplete="email" />
                  <TextInput id="detailed-contactNumber" name="contactNumber" label="Contact Number" value={detailedForm.contactNumber} onChange={(value) => { setField('contactNumber', value); detailedWizard.clearError(); }} type="tel" required autoComplete="tel" />
                  <RadioGroup name="preferredContact" label="Preferred Method of Contact" value={detailedForm.preferredContact} onChange={(value) => { setField('preferredContact', value); detailedWizard.clearError(); }} options={['Email', 'Phone', 'Either']} required />
                  {usesPhoneContact ? (
                    <ConditionalBlock>
                      <RadioGroup name="preferredContactTime" label="Preferred time to contact you" value={detailedForm.preferredContactTime} onChange={(value) => { setField('preferredContactTime', value); detailedWizard.clearError(); }} options={['Morning', 'Afternoon', 'Evening', 'Flexible']} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : detailedWizard.currentStep === 1 ? (
                <FieldGroup title="B. Property Interest">
                  <RadioGroup name="propertyInterest" label="Which property are you enquiring about?" value={detailedForm.propertyInterest} onChange={(value) => { setField('propertyInterest', value); detailedWizard.clearError(); }} options={[...propertyOptions, 'More than one property', 'Not sure yet']} required />
                  {detailedForm.propertyInterest === 'More than one property' ? (
                    <ConditionalBlock>
                      <CheckboxGroup name="selectedProperties" label="Which properties are you interested in?" values={detailedForm.selectedProperties} onChange={(values) => { setField('selectedProperties', values); detailedWizard.clearError(); }} options={propertyOptions} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.propertyInterest === 'Not sure yet' ? (
                    <ConditionalBlock>
                      <TextAreaField id="propertySearchDetails" label="Please tell us what type of property you are looking for" value={detailedForm.propertySearchDetails} onChange={(value) => { setField('propertySearchDetails', value); detailedWizard.clearError(); }} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="enquiringForSelf" label="Are you enquiring for yourself?" value={detailedForm.enquiringForSelf} onChange={(value) => { setField('enquiringForSelf', value); detailedWizard.clearError(); }} options={yesNoOptions} required />
                  {detailedForm.enquiringForSelf === 'No' ? (
                    <ConditionalBlock>
                      <TextInput id="enquiryOnBehalfOf" label="Who are you enquiring on behalf of?" value={detailedForm.enquiryOnBehalfOf} onChange={(value) => { setField('enquiryOnBehalfOf', value); detailedWizard.clearError(); }} required />
                      <TextInput id="relationshipToApplicant" label="What is your relationship to them?" value={detailedForm.relationshipToApplicant} onChange={(value) => { setField('relationshipToApplicant', value); detailedWizard.clearError(); }} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : detailedWizard.currentStep === 2 ? (
                <FieldGroup title="C. Tenancy Timing">
                  <TextInput id="moveInDate" label="When would you ideally like to move in?" value={detailedForm.moveInDate} onChange={(value) => { setField('moveInDate', value); detailedWizard.clearError(); }} type="date" required />
                  <RadioGroup name="rentalPeriod" label="How long would you like to rent the property for?" value={detailedForm.rentalPeriod} onChange={(value) => { setField('rentalPeriod', value); detailedWizard.clearError(); }} options={rentalPeriods} required />
                  <RadioGroup name="flexibleDates" label="Are your move-in dates flexible?" value={detailedForm.flexibleDates} onChange={(value) => { setField('flexibleDates', value); detailedWizard.clearError(); }} options={yesNoOptions} required />
                  {detailedForm.flexibleDates === 'Yes' ? (
                    <ConditionalBlock>
                      <TextAreaField id="flexibilityDetails" label="Please provide any helpful details about your flexibility" value={detailedForm.flexibilityDetails} onChange={(value) => setField('flexibilityDetails', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  {shorterTerm ? (
                    <ConditionalBlock>
                      <TextAreaField id="shortTermReason" label="Please briefly explain why you are looking for a shorter-term rental" value={detailedForm.shortTermReason} onChange={(value) => setField('shortTermReason', value)} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : detailedWizard.currentStep === 3 ? (
                <FieldGroup title="D. Occupancy">
                  <RadioGroup name="occupants" label="How many people would be moving in?" value={detailedForm.occupants} onChange={(value) => { setField('occupants', value); detailedWizard.clearError(); }} options={occupants} required />
                  {multipleOccupants ? (
                    <ConditionalBlock>
                      <TextAreaField id="occupantDetails" label="Please list who would be living at the property" value={detailedForm.occupantDetails} onChange={(value) => setField('occupantDetails', value)} required />
                      <RadioGroup name="occupantRelationship" label="What is your relationship to the other proposed occupants?" value={detailedForm.occupantRelationship} onChange={(value) => setField('occupantRelationship', value)} options={['Couple', 'Family', 'Friends / flatmates', 'Other']} required />
                      {detailedForm.occupantRelationship === 'Other' ? (
                        <TextInput id="occupantRelationshipOther" label="Please provide more detail" value={detailedForm.occupantRelationshipOther} onChange={(value) => setField('occupantRelationshipOther', value)} required />
                      ) : null}
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.occupants === 'More than 4' ? (
                    <ConditionalBlock>
                      <TextAreaField id="occupancyMoreThanFour" label="Please provide full details of proposed occupancy" value={detailedForm.occupancyMoreThanFour} onChange={(value) => setField('occupancyMoreThanFour', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="allAdults" label="Will all occupants be adults?" value={detailedForm.allAdults} onChange={(value) => setField('allAdults', value)} options={yesNoOptions} required />
                  {detailedForm.allAdults === 'No' ? (
                    <ConditionalBlock>
                      <TextAreaField id="childrenDetails" label="Please provide brief details of children/dependants who would live at the property" value={detailedForm.childrenDetails} onChange={(value) => setField('childrenDetails', value)} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : detailedWizard.currentStep === 4 ? (
                <FieldGroup title="E. Employment and Study">
                  <RadioGroup name="employmentStatus" label="Are you currently employed?" value={detailedForm.employmentStatus} onChange={(value) => { setField('employmentStatus', value); detailedWizard.clearError(); }} options={['Yes, full-time', 'Yes, part-time', 'Self-employed', 'No']} required />
                  {fullOrPartTime ? (
                    <ConditionalBlock>
                      <TextInput id="occupation" label="What is your occupation?" value={detailedForm.occupation} onChange={(value) => setField('occupation', value)} required />
                      <TextInput id="employer" label="Who is your employer?" value={detailedForm.employer} onChange={(value) => setField('employer', value)} required />
                      <TextInput id="roleLength" label="How long have you been in this role?" value={detailedForm.roleLength} onChange={(value) => setField('roleLength', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.employmentStatus === 'Self-employed' ? (
                    <ConditionalBlock>
                      <TextInput id="selfEmployedWork" label="What type of work do you do?" value={detailedForm.selfEmployedWork} onChange={(value) => setField('selfEmployedWork', value)} required />
                      <TextInput id="selfEmployedLength" label="How long have you been self-employed?" value={detailedForm.selfEmployedLength} onChange={(value) => setField('selfEmployedLength', value)} required />
                      <RadioGroup name="proofOfIncomeSelfEmployed" label="Would you be able to provide proof of income if required?" value={detailedForm.proofOfIncomeSelfEmployed} onChange={(value) => setField('proofOfIncomeSelfEmployed', value)} options={yesNoOptions} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.employmentStatus === 'No' ? (
                    <ConditionalBlock>
                      <TextAreaField id="unemployedSituation" label="Please briefly explain your current situation" value={detailedForm.unemployedSituation} onChange={(value) => setField('unemployedSituation', value)} required />
                      <TextInput id="rentPaymentPlan" label="How would rent be paid?" value={detailedForm.rentPaymentPlan} onChange={(value) => setField('rentPaymentPlan', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="student" label="Are you a student?" value={detailedForm.student} onChange={(value) => setField('student', value)} options={yesNoOptions} required />
                  {detailedForm.student === 'Yes' ? (
                    <ConditionalBlock>
                      <TextInput id="studySubject" label="What are you studying?" value={detailedForm.studySubject} onChange={(value) => setField('studySubject', value)} required />
                      <TextInput id="university" label="Which university or college do you attend?" value={detailedForm.university} onChange={(value) => setField('university', value)} required />
                      <TextInput id="studyStage" label="What stage of study are you at?" value={detailedForm.studyStage} onChange={(value) => setField('studyStage', value)} required />
                      <RadioGroup name="studentGuarantor" label="Would you have a guarantor if required?" value={detailedForm.studentGuarantor} onChange={(value) => setField('studentGuarantor', value)} options={yesNoOptions} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="rentPaidBy" label="Would the rent be paid by:" value={detailedForm.rentPaidBy} onChange={(value) => { setField('rentPaidBy', value); detailedWizard.clearError(); }} options={['Me personally', 'Joint tenants', 'Guarantor / family support', 'Employer / company', 'Other']} required />
                  {detailedForm.rentPaidBy === 'Joint tenants' ? (
                    <ConditionalBlock>
                      <RadioGroup name="jointTenantsNamed" label="Will all joint tenants be named on the tenancy?" value={detailedForm.jointTenantsNamed} onChange={(value) => setField('jointTenantsNamed', value)} options={['Yes', 'No', 'Not sure']} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.rentPaidBy === 'Guarantor / family support' ? (
                    <ConditionalBlock>
                      <RadioGroup name="guarantorAvailable" label="Would a guarantor be available if required?" value={detailedForm.guarantorAvailable} onChange={(value) => setField('guarantorAvailable', value)} options={yesNoOptions} required />
                      <TextAreaField id="guarantorDetails" label="Please provide any helpful details" value={detailedForm.guarantorDetails} onChange={(value) => setField('guarantorDetails', value)} />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.rentPaidBy === 'Employer / company' ? (
                    <ConditionalBlock>
                      <TextAreaField id="employerCompanyDetails" label="Please provide employer or company details" value={detailedForm.employerCompanyDetails} onChange={(value) => setField('employerCompanyDetails', value)} required />
                      <RadioGroup name="workRelocation" label="Is this part of a work relocation?" value={detailedForm.workRelocation} onChange={(value) => setField('workRelocation', value)} options={yesNoOptions} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.rentPaidBy === 'Other' ? (
                    <ConditionalBlock>
                      <TextAreaField id="rentPaymentOther" label="Please explain how rent would be paid" value={detailedForm.rentPaymentOther} onChange={(value) => setField('rentPaymentOther', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="supportingDocuments" label="Are you comfortable providing proof of income or supporting documents at a later stage if required?" value={detailedForm.supportingDocuments} onChange={(value) => { setField('supportingDocuments', value); detailedWizard.clearError(); }} options={yesNoOptions} required />
                </FieldGroup>
              ) : detailedWizard.currentStep === 5 ? (
                <FieldGroup title="F. Edinburgh / Relocation Background">
                  <RadioGroup name="liveInEdinburgh" label="Do you currently live in Edinburgh?" value={detailedForm.liveInEdinburgh} onChange={(value) => setField('liveInEdinburgh', value)} options={yesNoOptions} required />
                  {detailedForm.liveInEdinburgh === 'Yes' ? (
                    <ConditionalBlock>
                      <TextInput id="edinburghArea" label="What area of Edinburgh do you currently live in?" value={detailedForm.edinburghArea} onChange={(value) => setField('edinburghArea', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.liveInEdinburgh === 'No' ? (
                    <ConditionalBlock>
                      <TextInput id="movingFrom" label="Where are you moving from?" value={detailedForm.movingFrom} onChange={(value) => setField('movingFrom', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="workOrStudyEdinburgh" label="Do you currently work or study in Edinburgh?" value={detailedForm.workOrStudyEdinburgh} onChange={(value) => setField('workOrStudyEdinburgh', value)} options={yesNoOptions} required />
                  {detailedForm.workOrStudyEdinburgh === 'No' ? (
                    <ConditionalBlock>
                      <RadioGroup name="moveReason" label="Are you moving to Edinburgh for work, study, family, or another reason?" value={detailedForm.moveReason} onChange={(value) => setField('moveReason', value)} options={['Work', 'Study', 'Family', 'Relocation', 'Other']} required />
                      {detailedForm.moveReason === 'Other' ? (
                        <TextAreaField id="moveReasonOther" label="Please provide more detail" value={detailedForm.moveReasonOther} onChange={(value) => setField('moveReasonOther', value)} required />
                      ) : null}
                    </ConditionalBlock>
                  ) : null}
                  <TextAreaField id="movingToEdinburghDetails" label="If you are moving to Edinburgh, please briefly explain why" value={detailedForm.movingToEdinburghDetails} onChange={(value) => setField('movingToEdinburghDetails', value)} />
                </FieldGroup>
              ) : detailedWizard.currentStep === 6 ? (
                <FieldGroup title="G. Viewing Preferences">
                  <RadioGroup name="viewingPreference" label="Would you like to arrange a viewing?" value={detailedForm.viewingPreference} onChange={(value) => setField('viewingPreference', value)} options={['Yes, in person', 'Yes, virtual', 'Not at this stage']} required />
                  {wantsViewing ? (
                    <ConditionalBlock>
                      <TextInput id="viewingBestTime" label="When would suit you best?" value={detailedForm.viewingBestTime} onChange={(value) => setField('viewingBestTime', value)} required />
                      <TextAreaField id="viewingDifficultTimes" label="Are there any days or times that are difficult for you?" value={detailedForm.viewingDifficultTimes} onChange={(value) => setField('viewingDifficultTimes', value)} />
                      <RadioGroup name="viewingAvailability" label="Would weekday or weekend availability suit you better?" value={detailedForm.viewingAvailability} onChange={(value) => setField('viewingAvailability', value)} options={['Weekdays', 'Weekends', 'Either']} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.viewingPreference === 'Not at this stage' ? (
                    <ConditionalBlock>
                      <RadioGroup name="contactIfSuitable" label="Would you still like us to contact you if the property appears suitable?" value={detailedForm.contactIfSuitable} onChange={(value) => setField('contactIfSuitable', value)} options={yesNoOptions} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : detailedWizard.currentStep === 7 ? (
                <FieldGroup title="H. Rental History">
                  <RadioGroup name="currentlyRenting" label="Are you currently renting?" value={detailedForm.currentlyRenting} onChange={(value) => setField('currentlyRenting', value)} options={yesNoOptions} required />
                  {detailedForm.currentlyRenting === 'Yes' ? (
                    <ConditionalBlock>
                      <TextInput id="currentTenancyLength" label="How long have you been at your current property?" value={detailedForm.currentTenancyLength} onChange={(value) => setField('currentTenancyLength', value)} required />
                      <TextAreaField id="reasonForMoving" label="Why are you looking to move?" value={detailedForm.reasonForMoving} onChange={(value) => setField('reasonForMoving', value)} required />
                      <RadioGroup name="tenancyEndingSoon" label="Is your current tenancy ending soon?" value={detailedForm.tenancyEndingSoon} onChange={(value) => setField('tenancyEndingSoon', value)} options={yesNoOptions} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.currentlyRenting === 'No' ? (
                    <ConditionalBlock>
                      <TextAreaField id="currentLivingSituation" label="Please briefly explain your current living situation" value={detailedForm.currentLivingSituation} onChange={(value) => setField('currentLivingSituation', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="landlordReferences" label="Do you have references from previous landlords or letting agents?" value={detailedForm.landlordReferences} onChange={(value) => setField('landlordReferences', value)} options={['Yes', 'No', 'Not applicable']} required />
                  {detailedForm.landlordReferences === 'Yes' ? (
                    <ConditionalBlock>
                      <RadioGroup name="comfortableProvidingReferences" label="Would you be comfortable providing references at a later stage if required?" value={detailedForm.comfortableProvidingReferences} onChange={(value) => setField('comfortableProvidingReferences', value)} options={yesNoOptions} required />
                    </ConditionalBlock>
                  ) : null}
                  {detailedForm.landlordReferences === 'No' ? (
                    <ConditionalBlock>
                      <TextAreaField id="noReferencesContext" label="Please provide any context if you would like to" value={detailedForm.noReferencesContext} onChange={(value) => setField('noReferencesContext', value)} />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="rentedBefore" label="Have you rented before?" value={detailedForm.rentedBefore} onChange={(value) => setField('rentedBefore', value)} options={yesNoOptions} required />
                  {detailedForm.rentedBefore === 'No' ? (
                    <ConditionalBlock>
                      <TextAreaField id="rentedBeforeContext" label="Please briefly explain" value={detailedForm.rentedBeforeContext} onChange={(value) => setField('rentedBeforeContext', value)} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : detailedWizard.currentStep === 8 ? (
                <FieldGroup title="I. Pets, Smoking and Practical Matters">
                  <RadioGroup name="pets" label="Do you have any pets or intend to keep pets at the property?" value={detailedForm.pets} onChange={(value) => setField('pets', value)} options={yesNoOptions} required />
                  {detailedForm.pets === 'Yes' ? (
                    <ConditionalBlock>
                      <RadioGroup name="petType" label="What type of pet do you have or plan to have?" value={detailedForm.petType} onChange={(value) => setField('petType', value)} options={['Dog', 'Cat', 'Rabbit', 'Guinea pig', 'Hamster', 'Bird', 'Fish', 'Reptile', 'Other']} required />
                      {dogOrCat ? (
                        <>
                          <TextInput id="petCount" label="How many?" value={detailedForm.petCount} onChange={(value) => setField('petCount', value)} required />
                          <TextInput id="petBreed" label="What breed?" value={detailedForm.petBreed} onChange={(value) => setField('petBreed', value)} required />
                          <TextInput id="petAge" label="How old?" value={detailedForm.petAge} onChange={(value) => setField('petAge', value)} required />
                          <RadioGroup name="houseTrained" label="Are they house trained?" value={detailedForm.houseTrained} onChange={(value) => setField('houseTrained', value)} options={yesNoOptions} required />
                          <RadioGroup name="rentedWithPetBefore" label="Have they lived in rented accommodation before?" value={detailedForm.rentedWithPetBefore} onChange={(value) => setField('rentedWithPetBefore', value)} options={yesNoOptions} required />
                        </>
                      ) : null}
                      {smallPet ? (
                        <>
                          <TextInput id="petCount" label="How many?" value={detailedForm.petCount} onChange={(value) => setField('petCount', value)} required />
                          <TextAreaField id="petDetails" label="Please provide any helpful details" value={detailedForm.petDetails} onChange={(value) => setField('petDetails', value)} required />
                        </>
                      ) : null}
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="smoking" label="Does anyone who would live in the property smoke?" value={detailedForm.smoking} onChange={(value) => setField('smoking', value)} options={yesNoOptions} required />
                  {detailedForm.smoking === 'Yes' ? (
                    <ConditionalBlock>
                      <TextAreaField id="smokingDetails" label="Please provide brief details" value={detailedForm.smokingDetails} onChange={(value) => setField('smokingDetails', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="parking" label="Would you require parking?" value={detailedForm.parking} onChange={(value) => setField('parking', value)} options={['Yes', 'No', 'Not sure']} required />
                  {detailedForm.parking === 'Yes' ? (
                    <ConditionalBlock>
                      <TextAreaField id="parkingRequirements" label="Please provide any parking requirements" value={detailedForm.parkingRequirements} onChange={(value) => setField('parkingRequirements', value)} required />
                    </ConditionalBlock>
                  ) : null}
                  <RadioGroup name="accessibilityRequirements" label="Do you have any accessibility or practical requirements you would like us to be aware of?" value={detailedForm.accessibilityRequirements} onChange={(value) => setField('accessibilityRequirements', value)} options={yesNoOptions} required />
                  {detailedForm.accessibilityRequirements === 'Yes' ? (
                    <ConditionalBlock>
                      <TextAreaField id="accessibilityDetails" label="Please provide details" value={detailedForm.accessibilityDetails} onChange={(value) => setField('accessibilityDetails', value)} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              ) : (
                <FieldGroup title="J. Additional Information">
                  <TextAreaField id="additionalInfo" label="Is there anything else you would like us to know about your enquiry?" value={detailedForm.additionalInfo} onChange={(value) => setField('additionalInfo', value)} rows={5} />
                  <TextAreaField id="propertyQuestions" label="Do you have any questions about the property?" value={detailedForm.propertyQuestions} onChange={(value) => setField('propertyQuestions', value)} rows={5} />
                  <RadioGroup name="leadSource" label="Where did you hear about this property?" value={detailedForm.leadSource} onChange={(value) => setField('leadSource', value)} options={leadSources} required />
                  {detailedForm.leadSource === 'Other' ? (
                    <ConditionalBlock>
                      <TextInput id="leadSourceOther" label="Please specify" value={detailedForm.leadSourceOther} onChange={(value) => setField('leadSourceOther', value)} required />
                    </ConditionalBlock>
                  ) : null}
                </FieldGroup>
              )}
            </MultiStepFormWrapper>
            {detailedStatus === 'error' ? (
              <p className="error-text" role="alert" aria-live="assertive" style={{ marginTop: '0.75rem' }}>
                {detailedError || 'Unable to send your detailed enquiry right now. Please check your details and try again shortly.'}
              </p>
            ) : null}
          </form>
        )}
      </Section>
    </>
  );
}
