import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) {
            navigate('/home', {replace: true});
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    let user = ""

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            user = response.data.find((user: any) => user.username === formData.username);

            if (user) {
                setMessage("Login Successful");
                localStorage.setItem('user', JSON.stringify(user));             
                navigate('/home');
            } else {
                setMessage("Login Failed");
            }
        } catch (error: any) {
            console.log("Failed to submit form", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen overflow-y:hidden">
                <div className="p-3 rounded-lg shadow-lg text-white">
                    <h1 className="text-2xl mb-3 font-extrabold bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent bg-clip-text text-transparent py-6 mb-10">Welcome to the Resource Hub</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border text-black"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox h-4 w-4" />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-yellow-500 hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full py-2 bg-yellow-500 rounded hover:bg-yellow-800">
                            Login
                        </button>
                        <p className="text-center text-sm mt-4">{message}</p>
                    </form>
                    <p className="text-center text-sm mt-4">
                        To create a new account, <span className="text-yellow-500 hover:underline cursor-pointer" onClick={() => navigate('/')}>Click here</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
