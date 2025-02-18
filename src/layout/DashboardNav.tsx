import { AlertIcon } from '@src/icons';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import UserButton from './UserButton';

type Props = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
const DashboardNav = ({ setIsSidebarOpen }: Props) => {
  const segment = usePathname();

  return (
    <header className="flex h-[70px] items-center justify-between bg-white p-6">
      <button
        className="p-2 text-gray-700 sm:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex items-center justify-center gap-1">
        <h1 className="text-2xl font-semibold text-[#1A1619]">
          {segment == '/' ? 'Verifiers' : segment.replaceAll('/', '')}
        </h1>
        <small className="rounded-full bg-[#F2FAFF] p-1 text-xs font-medium text-primary">
          11
        </small>
      </div>
      <div className="flex items-center space-x-4">
        <AlertIcon />
        <UserButton />
      </div>
    </header>
  );
};

export default DashboardNav;
