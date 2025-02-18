'use client';

import { useFormContext } from 'react-hook-form';

import { HTMLProps, memo } from 'react';
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
  inputProps?: HTMLProps<HTMLInputElement>;
};

const FormInput = ({ name, label, placeholder, inputProps }: Props) => {
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
            <Input placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(FormInput);
