import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) {
            navigate('/home', {replace: true})
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('YOUR_BACKEND_ENDPOINT/signup', formData);
            setMessage("Signup Successful");
            navigate('/dashboard');
        } catch (error: any) {
            console.log("Failed to submit form", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 rounded-lg shadow-lg text-white">
            {/* <h1 className="text-2xl mb-3 font-extrabold bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent bg-clip-text text-transparent py-6 mb-10">Welcome to the Resource Hub</h1> */}
                <h2 className="text-2xl mb-6 text-center font-bold text-yellow-500 mb-10">Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="username" className="block mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="password" className="block mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 bg-yellow-500 hover:bg-yellow-800">
                        Sign Up
                    </button>
                    <p className="text-center text-sm mt-4">{message}</p>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account? <span className="text-yellow-500 hover:underline cursor-pointer" onClick={() => navigate('/login')}>Log in</span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
