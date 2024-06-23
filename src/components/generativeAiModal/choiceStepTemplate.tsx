import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import {
  GenerativeAiState,
  defaultGenerativeAiState,
} from './generativeAiModal';
import ChoiceTypeSelect from './choiceTypeSelect';
import { Input } from '../ui/input';

type ChoiceStepTemplateProps = {
  setFormState: Dispatch<SetStateAction<GenerativeAiState>>;
  form: GenerativeAiState;
};

const ChoiceStepTemplate: FC<ChoiceStepTemplateProps> = ({
  setFormState,
  form,
}) => {
  const onValueChange = useCallback(
    (value: string, field: 'type' | 'value', index: number) => {
      setFormState((curr) => ({
        ...curr,
        choice: curr.choice.map((x, i) =>
          i === index ? { ...x, [field]: value } : x,
        ),
      }));
    },
    [setFormState],
  );

  return defaultGenerativeAiState.choice.map(({ type }, index) => {
    const anchor = `${type}_${index}`;
    return (
      <div key={anchor} className="flex col-2 mb-[15px]">
        <div className="mr-[5px]">
          <ChoiceTypeSelect
            onHandleSelect={(select) => onValueChange(select, 'type', index)}
          />
        </div>

        <Input
          value={form.choice[index].value}
          placeholder="describe your choice..."
          onChange={(e) => onValueChange(e.target.value, 'value', index)}
        />
      </div>
    );
  });
};

export default ChoiceStepTemplate;
