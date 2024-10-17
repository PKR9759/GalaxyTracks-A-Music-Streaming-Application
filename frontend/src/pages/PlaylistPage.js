import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import {FaEllipsisV} from 'react-icons/fa' // Importing a playlist icon from Material Design icons

const PlaylistPage = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch the playlist details
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/playlists/${playlistId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Check if the response contains a playlist
                if (response.data.success) {
                    setPlaylist(response.data.playlist); // Set the playlist details from the response
                } else {
                    toast.error('Playlist not found.');
                    setPlaylist(null); // Set playlist to null if not found
                }
            } catch (error) {
                toast.error('Error fetching playlist: ' + (error.response?.data?.message || 'Server error'));
                setPlaylist(null);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchPlaylist();
    }, [playlistId]);

    // Display loading indicator while fetching data
    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white">
                <Navbar />
                <div className="pt-16 pb-16 flex justify-center items-center">
                    <div className="text-lg">Loading...</div> {/* Loading indicator */}
                </div>
                <Footer />
            </div>
        );
    }

    // If the playlist is not found after loading
    if (!playlist) return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="pt-16 pb-16">
                <div className="p-4">Playlist not found</div>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="pt-16 pb-16">
                {/* Playlist Header */}
                <div
                    className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center bg-cover bg-center rounded-lg overflow-hidden"
                    style={{
                        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAx3uMZCeAM9oi7493737U-bSOgBlqGI-eBg&s')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10">{playlist.name}</h1>
                        <p className="text-md md:text-lg mt-1 z-10">Songs: {playlist.songs.length}</p>
                    </div>
                </div>

                {/* Song List */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">Songs</h2>
                    <div className="space-y-4">
                        {playlist.songs.length > 0 ? (
                            playlist.songs.map((song) => (
                                <div
                                    key={song.id} // Use song.id as key if available
                                    className="flex items-center p-3 bg-[#1F1F1F] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-102 hover:translate-x-4 cursor-pointer" // Adjust scale and add translate on hover
                                    onClick={() => navigate(`/player/${song.id}`)} // Redirect to the player with songId
                                >
                                    {/* Display song image */}
                                    {song.image && (
                                        <img
                                            src={song.image} // Use the image directly from the response
                                            alt={song.title}
                                            className="w-14 h-14 rounded-lg mr-3" // Adjust image size
                                        />
                                    )}

                                    {/* Song details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{song.title}</h3>
                                        <p className="text-gray-400">Artist: {song.primary_artists || 'Unknown'}</p>
                                        <p className="text-gray-400">Duration: {Math.round(song.duration / 60)} mins</p>
                                        <button className="absolute top-5 right-5 text-white hover:text-gray-400 focus:outline-none">
                            <FaEllipsisV />
                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No songs available in this playlist.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PlaylistPage;
