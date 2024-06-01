// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-64 bg-black text-yellow-400 p-4 flex flex-col space-y-4">
      <h1 className="text-3xl font-bold mb-8">Resource Hub</h1>
      <Link to="/home" className="hover:text-yellow-500">Home</Link>
      <Link to="/todos" className="hover:text-yellow-500">Todos</Link>
      <Link to="/gallery" className="hover:text-yellow-500">Gallery</Link>
      <Link to="/posts" className="hover:text-yellow-500">Posts</Link>
      <Link to="/albums" className="hover:text-yellow-500">Albums</Link>
    </nav>
  );
};

export default Navbar;
