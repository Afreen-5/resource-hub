import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<number>(0);
  const [pendingTodos, setPendingTodos] = useState<number>(0);
  const [userTodos, setUserTodos] = useState<any[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showPending, setShowPending] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
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
  }, []);

  const handleCompletedClick = () => {
    setShowCompleted(true);
    setShowPending(false);
  };

  const handlePendingClick = () => {
    setShowCompleted(false);
    setShowPending(true);
  };

  const handleCloseClick = () => {
    setShowCompleted(false);
    setShowPending(false);
  };

  const filteredTodos = showCompleted
    ? userTodos.filter(todo => todo.completed)
    : showPending
    ? userTodos.filter(todo => !todo.completed)
    : [];

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <div onClick={handleCompletedClick} className="cursor-pointer bg-green-700 p-4 rounded-lg text-center">
          <p className="text-xl font-semibold">Completed Todos</p>
          <p className="text-3xl">{completedTodos}</p>
        </div>
        <div onClick={handlePendingClick} className="cursor-pointer bg-red-700 p-4 rounded-lg text-center">
          <p className="text-xl font-semibold">Pending Todos</p>
          <p className="text-3xl">{pendingTodos}</p>
        </div>
      </div>

      {(showCompleted || showPending) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40" onClick={handleCloseClick}>
          <div className="bg-white p-6 rounded shadow-lg relative" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{showCompleted ? 'Completed Todos' : 'Pending Todos'}</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                </tr>
              </thead>
              <tbody>
                {filteredTodos.map(todo => (
                  <tr key={todo.id}>
                    <td className="py-2 px-4 border-b text-left">{todo.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
