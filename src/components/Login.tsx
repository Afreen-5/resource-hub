import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const user = response.data.find((user: any) => user.username === formData.username);

            if (user) {
                setMessage("Login Successful");
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard');
            } else {
                setMessage("Login Failed");
            }
        } catch (error: any) {
            console.log("Failed to submit form", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-purple-900 p-8 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl mb-6">Welcome to the website</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-purple-800 border border-purple-700"
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-purple-800 border border-purple-700"
                        />
                    </div> */}
                    <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-purple-400 hover:underline">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700">
                        Login
                    </button>
                    <p className="text-center text-sm mt-4">{message}</p>
                </form>
                <p className="text-center text-sm mt-4">
                    To create a new account, <a href="#" className="text-purple-400 hover:underline">Click here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
