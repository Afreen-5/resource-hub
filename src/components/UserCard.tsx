import React from 'react';

const UserCard: React.FC = () => {
  const savedUser = localStorage.getItem('user');
  let user: any = '';
  if (savedUser) {
    user = JSON.parse(savedUser);
  }

  return (
    <>
      <div className="top-0 left-48 bg-black p-4 rounded-lg flex flex-col items-center text-center">
        <img
          className="w-40 h-40 rounded-full mb-4"
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt={user.name}
        />
        <h2 className="text-2xl font-bold text-yellow-500">{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.website}</p>
      </div>
    </>
  );
};

export default UserCard;


