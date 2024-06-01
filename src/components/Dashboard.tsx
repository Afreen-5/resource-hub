import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Album } from '../interface/Album';
import UserCard from './UserCard';

const UserDetail: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<number>(0);
  const [pendingTodos, setPendingTodos] = useState<number>(0);
  const [userTodos, setUserTodos] = useState<any[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showPending, setShowPending] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);

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

      const fetchAlbumsAndPosts = async () => {
        if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          const [albumsResponse, postsResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`),
            axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
          ]);

          setAlbums(albumsResponse.data);
          setPosts(postsResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      };
      fetchAlbumsAndPosts();
    });

  const fetchComments = async (postId: number) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    fetchComments(post.id);
  };

  const handleBackgroundClick = () => {
    setSelectedPost(null);
    setComments([]);
  };

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <UserCard />
      <div className="mt-8 backdrop-grayscale bg-white/30 flex justify-between">
        <div className="cursor-pointer w-64 h-40 rounded overflow-hidden shadow-lg bg-white p-4 m-4 flex flex-col items-center" onClick={handleCompletedClick}>
          <div className="mt-4 text-center">
            <p className="text-green-500 font-semibold text-lg">Completed Todos</p>
            <p className="text-green-500 decoration-8 py-10 text-3xl">{completedTodos}</p>
          </div>
        </div>
        <div className="cursor-pointer w-64 h-40 rounded overflow-hidden shadow-lg bg-white p-4 m-4 flex flex-col items-center" onClick={handlePendingClick}>
          <div className="mt-4 text-center">
            <p className="text-red-500 font-semibold text-lg">Pending Todos</p>
            <p className="text-red-500 decoration-8 py-10 text-3xl">{pendingTodos}</p>
          </div>
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

      <div className="container mx-auto p-4 relative">

        <h2 className="text-xl font-semibold mb-2">Albums</h2>
        <div className="border rounded w-[40%] p-4 mb-4 m-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Title</th>
              </tr>
            </thead>
            <tbody>
              {albums.map(album => (
                <tr key={album.id} className="hover:bg-gray-100 text-left transition-colors">
                  <td className="px-4 py-2">{album.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-2">Posts</h2>
        <Slider {...settings}>
          {posts.map(post => (
            <div key={post.id} onClick={() => handlePostClick(post)} className="cursor-pointer w-24 h-60 rounded overflow-hidden shadow-lg bg-white p-4 m-4">
              <h3 className="font-bold p-4">{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </Slider>

        {selectedPost && (
          <div onClick={handleBackgroundClick} className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 max-w-2xl w-full overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">{selectedPost.title}</h2>
              <table className="w-full">
                <tbody>
                  {comments.map(comment => (
                    <tr key={comment.id} className="border-b">
                      <td className="font-semibold p-2">{comment.name}</td>
                      <td className="p-2">{comment.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
