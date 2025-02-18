'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { handleErrorResponse } from '@src/lib/utils';
import { signupSchema, signupType } from '@src/lib/validation/signup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from './ui/form';
import FormButton from './ui/formButton';
import FormInput from './ui/formInput';
import FormSelect from './ui/formSelect';

const SignupTwo = () => {
  const router = useRouter();
  const form = useForm<signupType>({
    mode: 'onBlur',
    defaultValues: {
      business_address: {
        house_number: '',
        street: '',
        state: 'fct',
        city: '',
      },
      user: {
        name: '',
        phone_number: '',
        email: '',
      },
      password: '',
      confirm_password: '',
    },
    resolver: zodResolver(signupSchema),
  });
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: signupType) => {
    const storedData = localStorage.getItem('business_info');
    const businessInfo = storedData ? JSON.parse(storedData) : null;
    if (!businessInfo) {
      toast.error('Failed', { description: 'Business information not found' });
      return;
    }
    try {
      const res = await new Promise<{
        success: boolean;
        data?: string;
        message: string;
      }>((resolve, reject) => {
        setTimeout(() => {
          if (data && businessInfo) {
            resolve({
              success: true,
              data: { ...businessInfo, ...data },
              message: 'Registeration successfully, proceed to login',
            });
          } else {
            reject({
              success: false,
              message: 'Registeration failed!',
            });
          }
        }, 1500);
      });
      localStorage.setItem('reg_data', JSON.stringify(res.data));
      localStorage.removeItem('business_info');

      toast.success('Successful', { description: res.message });
      setTimeout(() => {
        router.replace('/auth/login');
      }, 1000);
    } catch (error) {
      handleErrorResponse(error as { status: boolean; message: string });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5 space-y-2">
          <p className="text-sm font-medium text-primary">Business Address</p>
          <div className="space-y-4">
            <div className="grid w-full grid-cols-4 items-center gap-4">
              <div className="col-span-1">
                <FormInput
                  label="House Number"
                  name="business_address.house_number"
                  inputProps={{
                    type: 'number',
                    min: '1',
                  }}
                />
              </div>
              <div className="col-span-3">
                <FormInput label="Street" name="business_address.street" />
              </div>
            </div>
            <div className="grid w-full grid-cols-2 items-center gap-4">
              <FormSelect
                label="State"
                name="business_address.state"
                options={[
                  { label: 'FCT', value: 'fct' },
                  { label: 'Lagos', value: 'lagos' },
                  { label: 'Port Harcourt', value: 'port-harcourt' },
                ]}
              />
              <FormInput label="City" name="business_address.city" />
            </div>
          </div>
        </div>
        <div className="my-5 space-y-2">
          <p className="text-sm font-medium text-primary">
            Contact Person Information
          </p>
          <div className="space-y-4">
            <FormInput label="Contact Name" name="user.name" />
            <FormInput
              label="Contact Phone Number"
              name="user.phone_number"
              inputProps={{
                type: 'tel',
              }}
            />
            <FormInput
              label="Contact Email Address"
              name="user.email"
              inputProps={{
                type: 'email',
              }}
            />
          </div>
        </div>
        <div className="mb-8 mt-5 space-y-2">
          <p className="text-sm font-medium text-primary">Password</p>
          <div className="space-y-4">
            <FormInput
              label="Password"
              name="password"
              inputProps={{
                type: 'password',
              }}
            />
            <FormInput
              label="Confirm Password"
              name="confirm_password"
              inputProps={{
                type: 'password',
              }}
            />
          </div>
        </div>
        <div className="flex w-3/5 items-center gap-2">
          <FormButton
            text="Submit"
            loadingText="Submitting..."
            className="w-1/2 py-5 font-medium"
            loading={isSubmitting}
            disabled={!isDirty || !isValid || isSubmitting}
          />
          <span className="text-xs font-medium text-[#808080]">
            Step 2 of 2
          </span>
        </div>
      </form>
    </Form>
  );
};

export default SignupTwo;
