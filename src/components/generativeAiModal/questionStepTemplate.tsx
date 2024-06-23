'use client';

import {
  FC,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { Textarea } from '../ui/textarea';
import { GenerativeAiState } from './generativeAiModal';
import { cn } from '../lib/utils';

type QuestionStepTemplateProps = {
  onKeyboardSubmit: () => void;
  setState: Dispatch<SetStateAction<GenerativeAiState>>;
  areaValue: string;
  disabled: boolean;
};

const QuestionStepTemplate: FC<QuestionStepTemplateProps> = ({
  onKeyboardSubmit,
  setState,
  areaValue,
  disabled,
}) => {
  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onKeyboardSubmit();
      }
    },
    [onKeyboardSubmit],
  );

  const onSetValueChangeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setState((curr) => ({ ...curr, question: e.target.value }));
    },
    [setState],
  );

  return (
    <Textarea
      className={cn('resize-none', disabled && 'cursor-not-allowed opacity-50')}
      value={areaValue}
      disabled={disabled}
      maxLength={300}
      onKeyDown={onKeyDownHandler}
      onChange={onSetValueChangeHandler}
      placeholder="Type your message here..."
    />
  );
};
QuestionStepTemplate.displayName = 'QuestionStepTemplate';
export default QuestionStepTemplate;
