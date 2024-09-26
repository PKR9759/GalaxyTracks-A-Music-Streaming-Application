import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

// Dummy user data
const dummyUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Music enthusiast, web developer, and avid playlist curator. I love discovering new tracks and sharing them with the world!',
    profilePicture: 'https://via.placeholder.com/200', // Replace with actual image URL
};

const ProfilePage = () => {
    const handleLogout = () => {
        alert('You have been logged out!');
    };

    return (
        <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen p-8 text-white flex flex-col items-center">
            {/* Profile Header with Red Gradient and Shadows */}
            <div className="relative w-full h-60 lg:h-[300px] flex items-center justify-center rounded-lg shadow-2xl mb-8 bg-gradient-to-r from-black via-red-800 to-gray-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    {/* Profile Picture with Drop Shadow */}
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <img
                            src={dummyUserData.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mt-4 text-shadow-lg text-white">
                        {dummyUserData.name}
                    </h1>
                </div>
                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 rounded-lg"></div>
            </div>

            {/* User Information Card with Stylish Background and Shadow */}
            <div className="w-full lg:w-2/3 p-6 rounded-lg shadow-2xl bg-gradient-to-r from-gray-800 via-black to-gray-900 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-2xl font-semibold mb-4 text-white shadow-md">
                    Profile Information
                </h2>
                <div className="space-y-3 text-gray-300">
                    <p className="text-lg"><strong>Name:</strong> {dummyUserData.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {dummyUserData.email}</p>
                    <p className="text-md mt-2"><strong>About:</strong> {dummyUserData.bio}</p>
                </div>
            </div>

            {/* Stylish Logout Button with Neon Glow Effect */}
            <button
                onClick={handleLogout}
                className="mt-8 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-full text-white text-lg flex items-center space-x-2 shadow-md transform hover:scale-105 transition-all hover:shadow-red-500/50"
            >
                <FaSignOutAlt /> <span>Logout</span>
            </button>
        </div>
    );
};

export default ProfilePage;
