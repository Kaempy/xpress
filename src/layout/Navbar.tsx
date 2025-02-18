'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import logo from '../../public/logo.png';
const Navbar = () => {
  const path = useSelectedLayoutSegment();
  return (
    <header className="fixed left-0 top-0 w-full p-8">
      <nav className="flex w-full items-center justify-between">
        <div>
          <Image src={logo} alt="Xpress logo" width={145} height={30} />
        </div>
        <div className="flex items-center justify-center gap-3">
          <p className="text-sm text-body">
            {path === 'signup'
              ? 'Already have an account?'
              : 'New to Xpress Rewards?'}
          </p>
          <Link
            href={path === 'signup' ? '/auth/login' : '/auth/signup'}
            className="rounded border border-primary px-3 py-2 text-sm font-bold text-primary hover:border-[#058ad8] hover:text-[#058ad8]"
          >
            {path === 'signup' ? 'Sign In' : 'Sign Up'}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
