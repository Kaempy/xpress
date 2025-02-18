import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Login',
};
const Login = dynamic(() => import('@src/components/auth/login'));
const LoginPage = () => <Login />;

export default LoginPage;
