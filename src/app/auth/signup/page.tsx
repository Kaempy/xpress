import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Signup',
};
const Signup = dynamic(() => import('@src/components/auth/signup'));
const SignupPage = () => <Signup />;

export default SignupPage;
