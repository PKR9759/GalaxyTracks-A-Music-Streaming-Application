import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-black text-white px-6 py-4 fixed w-full">
            <div className="flex justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="flex flex-col items-start">
                    <Link to="/" className="text-2xl font-bold hover:text-red-500 transition">
                        GalaxyTracks
                    </Link>
                    {/* Slogan */}
                    <span className="text-sm italic text-gray-400">Tracks Across the Universe</span>
                </div>

                {/* Navigation Links (Centered) */}
                <ul className="flex space-x-6 justify-center flex-grow">
                    <li>
                        <Link to="/" className="hover:text-red-500 transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/playlists" className="hover:text-red-500 transition">
                            Playlists
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-red-500 transition">
                            About Us
                        </Link>
                    </li>
                </ul>

                {/* Search and Profile Icons (Right Side) */}
                <div className="flex space-x-6 items-center">
                    <Link to="/search">
                        <FaSearch className="text-2xl hover:text-red-500 transition" />
                    </Link>

                    <Link to="/profile">
                        <FaUserCircle className="text-2xl hover:text-red-500 transition" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
