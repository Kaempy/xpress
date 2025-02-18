'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@src/components/ui/form';
import FormButton from '@src/components/ui/formButton';
import FormInput from '@src/components/ui/formInput';
import { useAuth } from '@src/context/use-auth';
import { handleErrorResponse } from '@src/lib/utils';
import { loginSchema, loginType } from '@src/lib/validation/login';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CardLayout from '../CardLayout';

const Login = () => {
  const form = useForm<loginType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = form;
  const { login } = useAuth();
  const onSubmit = async (data: loginType) => {
    try {
      const res = await new Promise<{
        success: boolean;
        data: {
          token?: string;
          user: {
            name: string;
            email: string;
          };
        };
        message: string;
        // },
      }>((resolve, reject) => {
        const storedData = localStorage.getItem('reg_data');
        const parsedData = storedData ? JSON.parse(storedData) : null;

        if (parsedData && parsedData.user) {
          setTimeout(() => {
            if (
              data.email === parsedData.user.email &&
              data.password === parsedData.password
            ) {
              resolve({
                success: true,
                data: {
                  token: 'mock-jwt-token',
                  user: {
                    name: parsedData.user.name,
                    email: parsedData.user.email,
                  },
                },
                message: 'You are successfully logged in',
              });
            } else {
              reject({ success: false, message: 'Invalid credentials' });
            }
          }, 1500);
        } else {
          reject({
            success: false,
            message: 'User not found, please ensure you have signed up',
          });
        }
      });

      toast.success('Successful', { description: res.message });
      login({
        token: res.data?.token,
        user: {
          name: res.data.user.name,
          email: res.data.user.email,
        },
      });
    } catch (error) {
      handleErrorResponse(error as { status: boolean; message: string });
    }
  };

  return (
    <CardLayout
      title="Welcome Back!"
      desc="Sign in to your Xpress reward partner's dashboard"
    >
      <Form {...form}>
        <form className="my-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email Address"
            name="email"
            inputProps={{
              type: 'email',
            }}
          />
          <div>
            <FormInput
              label="Password"
              name="password"
              inputProps={{
                type: 'password',
              }}
            />
            <div className="mt-1 flex items-center gap-1">
              <small>Forgot Password?</small>
              <Link href="#" className="text-sm text-primary hover:underline">
                Reset it
              </Link>
            </div>
          </div>
          <FormButton
            loading={isSubmitting}
            loadingText="Submitting..."
            text="Sign In"
            className="w-full"
            disabled={!isDirty || !isValid}
          />
        </form>
      </Form>
    </CardLayout>
  );
};

export default Login;
