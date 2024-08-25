import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            toast.success('Login successful');
            navigate('/dashboard'); // Redirect to dashboard or home after login
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-400 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
                    />
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-lg">
                    Login
                </button>
                <div className="text-center mt-4">
                    <span className="text-gray-400">Don't have an account?</span>
                    <Link to="/register" className="text-gray-200 ml-1">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
