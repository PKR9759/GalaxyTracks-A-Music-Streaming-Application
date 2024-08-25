import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', { email, password, confirmPassword });
            toast.success('Registration successful');
            navigate('/login'); // Redirect to login page after registration
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>
                <div className="mb-4">
                    <label className="block text-gray-400 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
                    />
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-lg">
                    Register
                </button>
                <div className="text-center mt-4">
                    <span className="text-gray-400">Already have an account?</span>
                    <Link to="/login" className="text-gray-200 ml-1">Login here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
