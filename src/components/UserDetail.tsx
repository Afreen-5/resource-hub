import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import Todos from './Todo';
import { useNavigate } from 'react-router-dom';

const UserDetail: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<number>(0);
  const [pendingTodos, setPendingTodos] = useState<number>(0);
  const [userTodos, setUserTodos] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);

  const savedUser = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user')
    if(!user) {
        navigate('/login', {replace: true});
    }
    const fetchTodos = async () => {
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`);
          const todos = response.data;
          const completed = todos.filter((todo: any) => todo.completed).length;
          const pending = todos.length - completed;
          setCompletedTodos(completed);
          setPendingTodos(pending);
          setUserTodos(todos);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      }
    };
    fetchTodos();

    const fetchAlbumsAndPosts = async () => {
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          const [albumsResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
          ]);
          setAlbums(albumsResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchAlbumsAndPosts();
  }, []);

  return (
    <>
        <UserCard />
        <Todos />
          <h2 className="text-3xl font-bold text-yellow-500 mt-8 ">Albums</h2>
          <div className="mt-4 bg-none p-4 rounded-lg ">
            <ul>
              {albums.map(album => (
                <li key={album.id} className="mb-2">{album.title}</li>
              ))}
            </ul>
          </div>
    </>
  );
};

export default UserDetail;
