import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  desc: string;
};

const CardLayout = ({ children, title, desc }: Props) => {
  return (
    <section className="mb-4 mt-20 rounded-lg bg-white p-8 shadow-md lg:w-[512px]">
      <div className="space-y-1 border-2 border-x-0 border-t-0 border-[#F5F6F8] pb-4">
        <h1 className="text-2xl font-medium text-primary">{title}</h1>
        <p className="text-xs text-body">{desc}</p>
      </div>
      {children}
    </section>
  );
};

export default CardLayout;
