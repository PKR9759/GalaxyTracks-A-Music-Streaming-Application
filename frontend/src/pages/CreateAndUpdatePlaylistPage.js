import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for fetching the playlist ID
import BASE_URL from '../apiConfig'; // Base URL for your API
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Footer component

const CreateAndUpdatePlaylist = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Initialize navigate
    const { playlistId } = useParams(); // Get playlistId from URL parameters

    useEffect(() => {
        const fetchPlaylistData = async () => {
            if (playlistId) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`${BASE_URL}/playlists/${playlistId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const playlist = response.data.playlist;
                    console.log(playlist)
                    setName(playlist.name);
                    setDescription(playlist.description);
                } catch (error) {
                    toast.error('Error fetching playlist data: ' + (error.response?.data?.message || 'Server error'));
                }
            }
        };

        fetchPlaylistData();
    }, [playlistId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            
            // Determine whether to create or update a playlist based on playlistId
            const endpoint = playlistId ? `${BASE_URL}/playlists/${playlistId}` : `${BASE_URL}/playlists/create`;
            const method = playlistId ? 'PUT' : 'POST'; // Use PUT for updates, POST for creation

            const response = await axios({
                method,
                url: endpoint,
                data: { name, description },
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(playlistId ? 'Playlist updated successfully!' : 'Playlist created successfully!');
            setName(''); // Reset the form
            setDescription('');

            // Redirect to the Playlists page after successful action
            navigate('/playlists');
        } catch (error) {
            toast.error('Error saving playlist: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <Navbar /> {/* Add Navbar component */}

            <div className="flex-grow flex flex-col justify-center items-center mt-40"> {/* Center the form vertically */}
                <form onSubmit={handleSubmit} className="bg-[#1F1F1F] p-6 rounded-lg w-full max-w-md border border-gray-600 mb-4">
                    <h2 className="text-2xl font-semibold text-white mb-6">{playlistId ? 'Update Playlist' : 'Create New Playlist'}</h2>

                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2">Playlist Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-black text-white border border-gray-600 rounded-lg focus:outline-none"
                            rows="4"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-[#333] text-white font-bold rounded-lg border border-gray-600 hover:bg-[#555]">
                        {playlistId ? 'Update Playlist' : 'Create Playlist'}
                    </button>
                </form>

                {/* Go Back Button */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/playlists')}
                        className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            <Footer /> {/* Add Footer component */}
        </div>
    );
};

export default CreateAndUpdatePlaylist;
