// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-64 bg-gradient-to-t from-zinc-800 to-zinc-900 text-yellow-400 p-4 flex flex-col space-y-4">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">Resource Hub</h1>
      <Link to="/home" className="font-bold hover:text-yellow-700">Home</Link>
      <Link to="/todos" className="font-bold hover:text-yellow-700">Todos</Link>
      <Link to="/gallery" className="font-bold hover:text-yellow-700">Gallery</Link>
      <Link to="/posts" className="font-bold hover:text-yellow-700">Posts</Link>
      <Link to="/albums" className="font-bold hover:text-yellow-700">Albums</Link>
    </nav>
  );
};

export default Navbar;
