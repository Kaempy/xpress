'use client';

import { useAuth } from '@src/context/use-auth';
import Navbar from '@src/layout/Navbar';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Readonly<Props>) => {
  const router = useRouter();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  }, [isAuth, router]);
  return (
    <main className="grid h-full min-h-screen items-center justify-center">
      <Navbar />
      {children}
    </main>
  );
};

export default AuthLayout;
