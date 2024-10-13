import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import BASE_URL from '../apiConfig'; // Import the base URL configuration
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create an instance of useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            toast.success('Login successful!');
            localStorage.setItem('token', response.data.token);
            // After successful login, redirect to home page
            navigate('/home'); // Adjust the path to your actual home page route
        } catch (error) {
            toast.error('Login failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-8 rounded-lg shadow-lg w-96 border border-gray-600">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

                <div className="mb-4">
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#333] text-white font-bold py-3 rounded-lg border border-gray-600 hover:bg-[#555] transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:border-white"
                >
                    Login
                </button>
                <p className="text-center text-white mt-4">
                    Don't have an account? <a href="/register" className="text-gray-400 hover:underline">Register</a>
                </p>
            </form>

            {/* ToastContainer for displaying toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
