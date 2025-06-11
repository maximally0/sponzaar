
import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
