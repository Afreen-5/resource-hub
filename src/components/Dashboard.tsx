import  { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { User } from '../interface/User';

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log("Data",response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-wrap justify-between">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Dashboard;
