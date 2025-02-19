'use client';

import { useAuth } from '@src/context/use-auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const Wrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      router.replace('/auth/login');
    }
  }, [isAuth]);
  return children;
};

export default Wrapper;
