
// // const UserCard = () => {
// //   const savedUser = localStorage.getItem('user')
// //   let user: any = ''
// //   if(savedUser) {
// //     user = JSON.parse(savedUser)
// //   }
// //   return (
// //     <div className="rounded overflow-hidden shadow-lg bg-white p-4 m-4">
// //       <div className="text-center mb-4">
// //         <img
// //           className="w-64 h-64 rounded-full mx-auto"
// //           src={`https://i.pravatar.cc/150?u=${user.id}`}
// //           alt={user.name}
// //         />
// //       </div>
// //       <div className="text-center">
// //         <h2 className="text-xl font-bold">{user.name}</h2>
// //         <p className="text-gray-600">{user.email}</p>
// //         <p className="text-gray-600">{user.phone}</p>
// //         <p className="text-blue-500">{user.website}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserCard;

// import React from 'react';

// const UserCard: React.FC = () => {
//   const savedUser = localStorage.getItem('user');
//   let user: any = '';
//   if (savedUser) {
//     user = JSON.parse(savedUser);
//   }

//   return (
//     <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
//       <img
//         className="w-40 h-40 rounded-full mx-auto"
//         src={`https://i.pravatar.cc/150?u=${user.id}`}
//         alt={user.name}
//       />
//       <div className="mt-4">
//         <h2 className="text-2xl font-bold text-gold">{user.name}</h2>
//         <p className="text-gray-400">{user.email}</p>
//         <p className="text-gray-400">{user.phone}</p>
//         <p className="text-blue-400">{user.website}</p>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

// src/components/UserCard.tsx
import React from 'react';

const UserCard: React.FC = () => {
  const savedUser = localStorage.getItem('user');
  let user: any = '';
  if (savedUser) {
    user = JSON.parse(savedUser);
  }

  return (
    <div className="bg-black p-4 rounded-lg flex flex-col items-center text-center">
      <img
        className="w-40 h-40 rounded-full mb-4"
        src={`https://i.pravatar.cc/150?u=${user.id}`}
        alt={user.name}
      />
      <h2 className="text-2xl font-bold text-yellow-400">{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p className="text-blue-500">{user.website}</p>
    </div>
  );
};

export default UserCard;


