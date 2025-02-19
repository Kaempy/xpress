'use client';

import Wrapper from '@src/app/Wrapper';
import React, { useState } from 'react';
import DashboardNav from './DashboardNav';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Wrapper>
      <div className="flex h-screen bg-[#f5f6f7]">
        {/* Sidebar Content */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        {/* Main Content */}
        <div className="flex w-full flex-1 flex-col sm:ml-64">
          {/* Navbar */}
          <DashboardNav setIsSidebarOpen={setIsSidebarOpen} />
          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </Wrapper>
  );
};

export default DashboardLayout;
