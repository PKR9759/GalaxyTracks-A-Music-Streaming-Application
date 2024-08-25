import React, { useState } from 'react';
import axios from 'axios'; 
import BASE_URL from '../apiConfig'; // Import the base URL configuration
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, { email, password, confirmPassword });
            toast.success('Registration successful!');
            // Handle successful registration (e.g., redirect to login)
        } catch (error) {
            toast.error('Registration failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        
        <div className="min-h-screen flex justify-center items-center bg-black">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

                <div className="mb-4">
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white neon-glow"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white neon-glow"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white neon-glow"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 neon-glow transition-transform duration-300 transform hover:scale-105 active:scale-95"
                >
                    Register
                </button>
                <p className="text-center text-white mt-4">
                    Already have an account? <a href="/login" className="text-red-500 hover:underline">Login</a>
                </p>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Register;
