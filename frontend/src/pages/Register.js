import React, { useState } from 'react';
import axios from 'axios'; 
import BASE_URL from '../apiConfig'; // Import the base URL configuration
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Create an instance of useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, { email, password, confirmPassword });
            localStorage.setItem('token', response.data.token);
            toast.success('Registration successful!');
            
            // After successful registration, redirect to the home page
            navigate('/home'); // Adjust the path to your actual home page route
        } catch (error) {
            toast.error('Registration failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-8 rounded-lg shadow-lg w-96 border border-gray-600">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

                <div className="mb-4">
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#333] text-white font-bold py-3 rounded-lg border border-gray-600 hover:bg-[#555] transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:border-white"
                >
                    Register
                </button>
                <p className="text-center text-white mt-4">
                    Already have an account? <a href="/login" className="text-gray-400 hover:underline">Login</a>
                </p>
            </form>

            {/* ToastContainer for displaying toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default Register;
