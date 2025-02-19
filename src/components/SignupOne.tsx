import { zodResolver } from '@hookform/resolvers/zod';
import { businessInfoSchema, signupType1 } from '@src/lib/validation/signup';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form } from './ui/form';
import FormInput from './ui/formInput';
import FormSelect from './ui/formSelect';
import { FormUpload } from './ui/FormUpload';

type Props = {
  setNext: Dispatch<SetStateAction<boolean>>;
};

const SignupOne = ({ setNext }: Props) => {
  const form = useForm<signupType1>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phone_number: '',
      email: '',
      acct_no: '',
      category: 'sme',
      logo: undefined,
    },
    resolver: zodResolver(businessInfoSchema),
  });
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = (data: signupType1) => {
    localStorage.setItem('business_info', JSON.stringify(data));
    return setNext(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 mt-5 space-y-2">
          <p className="text-sm font-medium text-primary">
            Business Information
          </p>
          <div className="space-y-4">
            <FormInput label="Business name" name="name" />
            <FormInput
              label="Business Email Address"
              name="email"
              inputProps={{
                type: 'email',
              }}
            />
            <FormInput
              label="Business Phone Number"
              name="phone_number"
              limit={11}
              inputProps={{
                type: 'tel',
              }}
            />
            <FormSelect
              label="Business Category"
              name="category"
              options={[
                { label: 'SME', value: 'sme' },
                { label: 'Corporate', value: 'corporate' },
              ]}
            />
            <FormInput
              label="Account No"
              name="acct_no"
              limit={10}
              inputProps={{
                type: 'number',
                minLength: 10,
                maxLength: 10,
              }}
            />
            <FormUpload name="logo" label="Image (Logo)" />
          </div>
        </div>
        <div className="flex w-3/5 items-center gap-2">
          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            className="w-1/2 py-5 font-medium"
          >
            Next
          </Button>
          <span className="text-xs font-medium text-[#808080]">
            Step 1 of 2
          </span>
        </div>
      </form>
    </Form>
  );
};

export default SignupOne;
