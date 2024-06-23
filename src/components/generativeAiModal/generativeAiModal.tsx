'use client';

import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import QuestionStepTemplate from './questionStepTemplate';
import { cn } from '../lib/utils';
import { useStepControl } from './useStepControl';
import ChoiceStepTemplate from './choiceStepTemplate';

type GenerativeAiModalType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export type GenerativeAiState = {
  question: string;
  choice: { type: string; value: string }[];
};

export const defaultGenerativeAiState: GenerativeAiState = {
  question: '',
  choice: [
    { type: '', value: '' },
    { type: '', value: '' },
  ],
};

const GenerativeAiModal: FC<GenerativeAiModalType> = ({
  isOpen,
  setIsOpen,
}) => {
  const [state, setState] = useState<GenerativeAiState>(
    () => defaultGenerativeAiState,
  );

  const { step, setStep, onSubmitStep, isStepCompleted } = useStepControl({
    formState: state,
    setIsShowModal: setIsOpen,
    setFormState: setState,
  });

  const onReset = useCallback(() => {
    setState(defaultGenerativeAiState);
    setStep('question');
  }, [setStep]);

  const { title, content } = useMemo((): {
    content: JSX.Element | null;
    title: string;
  } => {
    switch (step) {
      case 'question':
        return {
          title: 'What is your question?',
          content: (
            <QuestionStepTemplate
              areaValue={state.question}
              setState={setState}
              disabled={step !== 'question'}
              onKeyboardSubmit={onSubmitStep}
            />
          ),
        };
      case 'choice':
        return {
          title: 'What is your choices?',
          content: <ChoiceStepTemplate form={state} setFormState={setState} />,
        };
    }
  }, [onSubmitStep, state, step]);

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {step !== 'question' && (
              <AlertDialogCancel onClick={onReset}>Reset</AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={onSubmitStep}
              className={cn(
                'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2',
                isStepCompleted && 'cursor-not-allowed opacity-50',
              )}
            >
              Ask question
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
GenerativeAiModal.displayName = 'GenerativeAiModal';
export default GenerativeAiModal;
