import { useState, useCallback } from 'react';

export type StepValidator = () => string;

export type UseMultiStepFormReturn = {
  currentStep: number;
  direction: 'forward' | 'back';
  isReviewing: boolean;
  fromReview: boolean;
  stepError: string;
  progress: number;
  goNext: () => void;
  goBack: () => void;
  editStep: (index: number) => void;
  confirmEdit: () => void;
  clearError: () => void;
};

export function useMultiStepForm(
  totalSteps: number,
  validators: StepValidator[]
): UseMultiStepFormReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [isReviewing, setIsReviewing] = useState(false);
  const [fromReview, setFromReview] = useState(false);
  const [stepError, setStepError] = useState('');

  const progress = isReviewing
    ? 100
    : Math.round(((currentStep + 1) / (totalSteps + 1)) * 100);

  const goNext = useCallback(() => {
    if (isReviewing) return;
    const error = validators[currentStep]?.() ?? '';
    if (error) {
      setStepError(error);
      return;
    }
    setStepError('');
    setDirection('forward');
    if (fromReview) {
      setFromReview(false);
      setIsReviewing(true);
    } else if (currentStep === totalSteps - 1) {
      setIsReviewing(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, totalSteps, validators, isReviewing, fromReview]);

  const goBack = useCallback(() => {
    setStepError('');
    setDirection('back');
    if (isReviewing) {
      setIsReviewing(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep, totalSteps, isReviewing]);

  const editStep = useCallback((index: number) => {
    setStepError('');
    setDirection('back');
    setIsReviewing(false);
    setFromReview(true);
    setCurrentStep(index);
  }, []);

  const confirmEdit = goNext;

  const clearError = useCallback(() => setStepError(''), []);

  return {
    currentStep,
    direction,
    isReviewing,
    fromReview,
    stepError,
    progress,
    goNext,
    goBack,
    editStep,
    confirmEdit,
    clearError
  };
}
