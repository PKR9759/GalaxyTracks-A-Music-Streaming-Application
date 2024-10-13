import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { toast,ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';


const ProfilePage = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePicture: '',
        
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/user/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserData(response.data.data);
                } catch (error) {
                    toast.error('Error fetching user profile');
                }
            };
            fetchUserProfile();
        }
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Show a toast message
        toast.success('You have successfully logged out!');

        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/login'); // Redirect to login page
        }, 1000); // Delay to show toast notification before redirect
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`${BASE_URL}/user/profile`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    return (
        <div className="bg-black min-h-screen p-8 text-white flex flex-col items-center">
            {/* Profile Header */}
            <div className="relative w-full h-60 lg:h-[300px] flex items-center justify-center rounded-lg shadow-2xl mb-8 bg-gradient-to-r from-black via-gray-900 to-black">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    {/* Profile Picture */}
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <img
                            src={userData.profilePicture || 
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTITJo17ykuTEOk1_ZURczbvHlLhnTJc2YEwg&s"
                               }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mt-4 text-shadow-lg text-white">
                        {userData.name}
                    </h1>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 rounded-lg"></div>
            </div>

            {/* User Information Card */}
            <div className="w-full lg:w-2/3 p-6 rounded-lg shadow-2xl bg-[#1F1F1F] backdrop-blur-sm border border-gray-600">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                    Profile Information
                </h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Profile Picture URL:</label>
                            <input
                                type="text"
                                name="profilePicture"
                                value={userData.profilePicture}
                                onChange={handleChange}
                                className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500"
                            />
                        </div>
                       
                        <button
                            type="submit"
                            className="w-full py-2 bg-gray-700 rounded-lg mt-4"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="space-y-3 text-gray-300">
                        <p className="text-lg"><strong>Name:</strong> {userData.name}</p>
                        <p className="text-lg"><strong>Email:</strong> {userData.email}</p>
                        
                        <button
                            className="mt-4 px-4 py-2 bg-gray-700 rounded-lg"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mt-8 px-6 py-2 bg-[#333] hover:bg-[#555] rounded-full text-white text-lg flex items-center space-x-2 shadow-md transform hover:scale-105 transition-all hover:shadow-gray-500/50"
            >
                <FaSignOutAlt /> <span>Logout</span>
            </button>
            <ToastContainer/>
        </div>
    );
};

export default ProfilePage;
