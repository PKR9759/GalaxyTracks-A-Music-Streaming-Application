// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link to="/home" className="text-xl text-gray-400 hover:underline">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
