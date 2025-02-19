'use client';

import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { ChangeEvent, HTMLProps, memo } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  limit?: number;
  inputProps?: HTMLProps<HTMLInputElement>;
};

const FormInput = ({ name, label, limit, placeholder, inputProps }: Props) => {
  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    const cleaned = inputValue.replace(/(?!^\+|\d)\D/g, '');
    return cleaned;
  };
  const handleNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    // Remove 'e', 'E', and '.' (dot)
    const cleaned = inputValue.replace(/[eE.]/g, '');
    return cleaned;
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    let value =
      inputProps?.type === 'tel'
        ? handleNumericInput(e)
        : inputProps?.type === 'number'
          ? handleNumberInput(e)
          : e.target.value;
    // Ensure `limit` is respected (assuming `limit` is a number prop)
    if (limit && typeof limit === 'number' && value.length > limit) {
      value = value.slice(0, limit); // Trim the value to the limit
    }
    field.onChange(value);
  };

  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className="text-sm font-medium text-title">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              onChange={(e) => handleChange(e, field)}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(FormInput);
