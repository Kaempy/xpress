import { DealIcon, TransactionIcon } from '@src/icons';
import { cn } from '@src/lib/utils';
import { UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../../public/logo.png';
type Props = {
  isSidebarOpen: boolean;
};

const items = [
  {
    label: 'Verifiers',
    icon: <UsersRound size={17} />,
    href: '/',
  },
  {
    label: 'Deals',
    icon: <DealIcon />,
    href: '#',
  },
  {
    label: 'Transactions',
    icon: <TransactionIcon />,
    href: '#',
  },
];
const Sidebar = ({ isSidebarOpen }: Props) => {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed h-full w-64 space-y-6 bg-white p-5 shadow-md transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      } sm:translate-x-0`}
    >
      <div className="mx-auto my-2">
        <Image
          src={logo}
          alt="Xpress logo"
          width={143}
          height={30}
          className="m-auto object-contain"
        />
      </div>
      <nav className="my-16 space-y-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center gap-2 rounded-md border-l-2 border-transparent p-2 text-sm text-title hover:border-primary hover:bg-[#F2FAFF]',
              pathname === item.href ? 'border-primary bg-[#F2FAFF]' : ''
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
