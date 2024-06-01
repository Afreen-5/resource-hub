import React from 'react';
import UserCard from './UserCard';
import Navbar from './Navbar';

const Home: React.FC = () => {
  return (
    <div className="p-8 m-0 border-0 bg-black">
        <Navbar />
      <UserCard />
      <div className="text-center mt-8">
        <h1 className="text-4xl text-gold">Welcome to Mostudio</h1>
        <p className="text-lg">Explore user details, todos, albums, and posts.</p>
      </div>
    </div>
  );
};

export default Home;
