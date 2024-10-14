import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdPlaylistPlay } from 'react-icons/md'; // Importing a playlist icon from Material Design icons
import BASE_URL from '../apiConfig';

const PlaylistsPage = () => {
    const [yourPlaylists, setYourPlaylists] = useState([]);

    // Fetch the user's playlists on component mount
    useEffect(() => {
        const fetchPlaylists = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/playlists/all`, {
                    headers: { Authorization: `Bearer ${token}` }, // Send token in the headers
                });

                if (response.data.success) {
                    setYourPlaylists(response.data.playlists); // Set playlists from the response
                } else {
                    console.error('Failed to fetch playlists');
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-16 pb-16 px-8 space-y-10">
                {/* Your Playlists Section */}
                <section>
                    <h2 className="text-4xl font-bold mb-4 text-white">Your Playlists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {/* "Create Playlist" Card */}
                        <Link
                            to="/createPlaylist"
                            className="relative p-4 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                            style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }}
                        >
                            <div className="bg-gray-700 h-32 mb-2 rounded-md flex items-center justify-center">
                                <span className="text-white text-6xl">+</span>
                            </div>
                            <p className="text-white text-lg text-center">Create Playlist</p>
                        </Link>

                        {/* Render Existing Playlists */}
                        {yourPlaylists.map((playlist) => (
                            <div
                                key={playlist._id}
                                className="relative p-4 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                                style={{
                                    border: '1px solid #444',
                                    backgroundColor: '#1f1f1f',
                                    overflow: 'hidden', // Ensure no overflow
                                }}
                            >
                                <Link
                                    to={`/playlist/${playlist.id}`}
                                    className="relative block text-center no-underline text-white hover:text-gray-300 focus:outline-none focus:ring-0"
                                    style={{ color: '#fff' }}
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <MdPlaylistPlay className="text-9xl text-gray-400" /> {/* Increased size to 8xl */}
                                    </div>
                                    <p className="text-white text-lg">{playlist.name}</p>
                                    <p className="text-gray-300 text-sm">Created by You</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PlaylistsPage;
