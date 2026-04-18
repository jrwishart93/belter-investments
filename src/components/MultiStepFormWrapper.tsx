import type { ReactNode } from 'react';
import type { EnquirySection } from '../lib/forms';

type WizardReviewScreenProps = {
  sections: EnquirySection[];
  onEdit: (stepIndex: number) => void;
  stepTitles: string[];
};

export function WizardReviewScreen({ sections, onEdit, stepTitles }: WizardReviewScreenProps) {
  return (
    <div className="wizard-review">
      {sections.map((section) => {
        const stepIndex = stepTitles.indexOf(section.title ?? '');
        return (
          <div key={section.title} className="wizard-review__section">
            <div className="wizard-review__section-header">
              <span className="wizard-review__section-title">{section.title}</span>
              {stepIndex !== -1 && (
                <button type="button" className="wizard-review__edit-btn" onClick={() => onEdit(stepIndex)}>
                  Edit
                </button>
              )}
            </div>
            {(section.fields ?? []).map((field) => (
              <div key={field.label} className="wizard-review__field">
                <span className="wizard-review__field-label">{field.label}</span>
                <span className="wizard-review__field-value">{field.value}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

type MultiStepFormWrapperProps = {
  children: ReactNode;
  currentStep: number;
  direction: 'forward' | 'back';
  isReviewing: boolean;
  fromReview: boolean;
  stepError: string;
  progress: number;
  totalSteps: number;
  stepLabel?: string;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
};

export function MultiStepFormWrapper({
  children,
  currentStep,
  direction,
  isReviewing,
  fromReview,
  stepError,
  progress,
  totalSteps,
  stepLabel,
  onNext,
  onBack,
  submitLabel = 'Submit',
  submitDisabled = false
}: MultiStepFormWrapperProps) {
  const isLastContentStep = currentStep === totalSteps - 1;
  const showBack = isReviewing || currentStep > 0;

  const nextLabel = fromReview
    ? 'Back to Review'
    : isLastContentStep
      ? 'Review your answers'
      : 'Next';

  return (
    <div className="wizard-container">
      <div
        className="wizard-step"
        key={isReviewing ? 'review' : String(currentStep)}
        data-direction={direction}
      >
        {stepLabel ? <p className="wizard-step-label">{stepLabel}</p> : null}
        {children}
        {stepError ? (
          <p className="error-text wizard-step-error" role="alert" aria-live="assertive">
            {stepError}
          </p>
        ) : null}
      </div>

      <nav className="wizard-nav">
        {showBack ? (
          <button type="button" className="cta-button cta-button--secondary" onClick={onBack}>
            Back
          </button>
        ) : null}
        {isReviewing ? (
          <button type="submit" className="cta-button" disabled={submitDisabled}>
            {submitDisabled ? 'Submitting…' : submitLabel}
          </button>
        ) : (
          <button type="button" className="cta-button" onClick={onNext}>
            {nextLabel}
          </button>
        )}
      </nav>

      <div className="wizard-progress" aria-hidden="true">
        <div className="wizard-progress__bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
