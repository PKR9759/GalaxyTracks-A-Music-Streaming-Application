import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import BASE_URL from '../apiConfig'; // Import the base URL configuration
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            toast.success('Login successful!');
            // Handle successful login (e.g., save token, redirect)
        } catch (error) {
            toast.error('Login failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

                <div className="mb-4">
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white neon-glow"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white neon-glow"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 neon-glow transition-transform duration-300 transform hover:scale-105 active:scale-95"
                >
                    Login
                </button>
                <p className="text-center text-white mt-4">
                    Don't have an account? <a href="/register" className="text-red-500 hover:underline">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
