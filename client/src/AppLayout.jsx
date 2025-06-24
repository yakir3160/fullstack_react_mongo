// src/AppLayout.jsx
import React from 'react';
import NavBar from '@components/Nav/NavBar';
import { Outlet } from 'react-router-dom';
import { useFetchData } from '@hooks/useFetchData';

const AppLayout = () => {
  useFetchData(); // Fetch data on initial render
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <NavBar />
      
      {/* Main Content */}
      <main className="flex justify-center py-8 flex-1">
        <div className="w-[95%] max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
