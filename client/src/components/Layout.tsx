
import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <main className="flex-1 p-12 overflow-auto">
        {children}
      </main>
    </div>
  );
};
