import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Post: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState<any | null>(null);
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const savedUser = localStorage.getItem('user');
            console.log('Saved user:', savedUser);

            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    console.log('Parsed user:', user);

                    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
                    console.log('Fetched posts:', postResponse.data);

                    setPosts(postResponse.data);
                } catch (error: any) {
                    console.error("Error fetching posts:", error);
                }
            } else {
                console.log("No user data found in localStorage");
            }
        };
        fetchPosts();
    }, []);

    const handlePostClick = (post: any) => {
        console.log("Post clicked:", post);
        setSelectedPost(post);
        fetchComments(post.id);
    };

    const handleBackgroundClick = () => {
        setSelectedPost(null);
        setComments([]);
    };

    const fetchComments = async (postId: number) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            console.log("Fetched comments for post id:", postId, response.data);

            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
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
        <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mt-4 mb-2 text-white">Posts</h2>
            {posts.length === 0 ? (
                <p className="text-white">No posts available</p>
            ) : (
                <Slider {...settings}>
                    {posts.map(post => (
                        <div 
                            key={post.id} 
                            onClick={() => handlePostClick(post)} 
                            className="cursor-pointer rounded overflow-hidden shadow-lg bg-none p-4 m-4 "
                        >
                            <h3 className="font-bold p-4 text-yellow-500">{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </Slider>
            )}
            {selectedPost && (
                <div 
                    onClick={handleBackgroundClick} 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
                >
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-stone-700 to-stone-500 rounded-lg p-4 max-w-2xl w-full overflow-y-auto"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-center text-yellow-500">{selectedPost.title}</h2>
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

export default Post;
