import {
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  GenerativeAiState,
  defaultGenerativeAiState,
} from './generativeAiModal';
import { saveGenerativeItem } from './utils';

export type Step = 'question' | 'choice';

type UseStepControlArgs = {
  formState: GenerativeAiState;
  setFormState: Dispatch<SetStateAction<GenerativeAiState>>;
  setIsShowModal: (isOpen: boolean) => void;
};

type UseStepControlReturn = {
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
  onSubmitStep: () => void;
  isStepCompleted: boolean;
};

export const useStepControl = ({
  formState,
  setIsShowModal,
  setFormState,
}: UseStepControlArgs): UseStepControlReturn => {
  const [step, setStep] = useState<Step>('question');

  const isStepCompleted = useMemo((): boolean => {
    const { question, choice } = formState;

    if (step === 'question') {
      return question.trim().length > 0;
    }

    if (step === 'choice') {
      return choice.every((x) => x.type && x.value.trim().length > 0);
    }

    return true;
  }, [formState, step]);

  const onSubmitQuestionStep = useCallback(() => {
    setStep('choice');
  }, []);

  const onSubmitChoiceStep = useCallback(() => {
    setStep('question');
    setFormState(defaultGenerativeAiState);
    saveGenerativeItem(formState);
    setIsShowModal(false);
  }, [formState, setFormState, setIsShowModal]);

  const onSubmitStep = useCallback((): void => {
    if (!isStepCompleted) return;

    switch (step) {
      case 'question':
        onSubmitQuestionStep();
        break;
      case 'choice':
        onSubmitChoiceStep();
        break;
      default:
        break;
    }
  }, [isStepCompleted, step, onSubmitQuestionStep, onSubmitChoiceStep]);

  return { step, onSubmitStep, isStepCompleted: !isStepCompleted, setStep };
};
