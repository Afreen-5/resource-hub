import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/']; // Add routes where you don't want to show the Navbar

  return (
    <div className="flex min-h-screen bg-black-cardboard bg-cover bg-center">
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main className="flex-1 bg-black-gold bg-opacity-75 text-white p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
