import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/']; 

  return (
    <div className="flex min-h-screen">
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main className="flex-1 bg-black-gold bg-opacity-10 text-white p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
