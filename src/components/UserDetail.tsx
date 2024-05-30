import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Album } from '../interface/Album';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const [albums, setAlbums] = useState<Album[]>([]); 
  const [posts, setPosts] = useState<any[]>([]); 
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (id) { 
      const fetchAlbumsAndPosts = async () => {
        try {
          const [albumsResponse, postsResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`),
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
          ]);

          setAlbums(albumsResponse.data);
          setPosts(postsResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchAlbumsAndPosts();
    }
  }, [id]);

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
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <h2 className="text-xl font-semibold mb-2">Albums</h2>
      <div className="border rounded p-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {albums.map(album => (
              <tr key={album.id} className="hover:bg-gray-100 transition-colors">
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
          <div className= "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 max-w-2xl w-full overflow-y-auto">
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
  );
};

export default UserDetail;
