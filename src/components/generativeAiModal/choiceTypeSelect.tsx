'use client';

import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

const options = ['dollar', 'number', 'string', 'boolean'];

type ChoiceTypeSelectProps = {
  onHandleSelect: (value: string) => void;
};

const ChoiceTypeSelect: FC<ChoiceTypeSelectProps> = ({ onHandleSelect }) => {
  return (
    <Select onValueChange={onHandleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="-- select your choice ---" />
      </SelectTrigger>
      <SelectContent>
        {options.map((it) => (
          <SelectItem className="text-white" key={it} value={it}>
            {it}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

ChoiceTypeSelect.displayName = 'ChoiceTypeSelect';
export default ChoiceTypeSelect;
