'use client';

import { useFormContext } from 'react-hook-form';

import { memo } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

type Option = { value: string; label: string };
type Props = {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
};
const FormSelect = ({ name, label, placeholder, options }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem className="space-y-0">
          <FormLabel className="text-sm font-medium text-title">
            {label}
          </FormLabel>
          <Select onValueChange={onChange} value={value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(FormSelect);
