import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams to get songId from the URL
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styling for toasts
import BASE_URL from '../apiConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlayerPage = () => {
    const { songId } = useParams(); // Get songId from the URL
    const [songDetails, setSongDetails] = useState(null);
    const [playlists, setPlaylists] = useState([]); // Store user's playlists
    const [selectedPlaylist, setSelectedPlaylist] = useState(''); // Store selected playlist

    // Fetch song details
    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/song/${songId}`);
                if (response.data.success) {
                    setSongDetails(response.data.data); // Set song details
                } else {
                    toast.error('Failed to fetch song details.');
                }
            } catch (error) {
                toast.error('Error fetching song details: ' + error.message);
            }
        };

        fetchSongDetails();
    }, [songId]);

    // Fetch user's playlists on component mount
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
                    setPlaylists(response.data.playlists); // Set playlists from the response
                } else {
                    console.error('Failed to fetch playlists');
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    // Add song to selected playlist
    const addToPlaylist = async () => {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

        if (!selectedPlaylist) {
            toast.error('Please select a playlist.');
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/playlists/${selectedPlaylist}/addSong/${songId}`, // Adjust the endpoint to include songId in the path
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success('Song added to playlist!'); // Success message
            } else {
                toast.error('Failed to add song to playlist.');
            }
        } catch (error) {
            toast.error('Error adding song to playlist: ' + error.message);
        }
    };

    if (!songDetails) return <div className="text-white">Loading...</div>;

    return (
        <div className="bg-black min-h-screen text-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-20 p-8 space-y-6">
                {/* Song Details Section */}
                <h1 className="text-4xl font-bold">{songDetails.name}</h1>
                <img src={songDetails.image} alt={songDetails.name} className="rounded-lg mb-4" />
                <p className="text-lg">Artist: {songDetails.artist}</p>
                <p className="text-lg">Duration: {songDetails.duration} seconds</p>

                {/* Add to Playlist Section */}
                <div className="mt-6">
                    <h2 className="text-2xl font-bold">Add to Playlist</h2>
                    <select
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                        className="mt-2 p-2 bg-gray-900 rounded-md"
                    >
                        <option value="">Select a Playlist</option>
                        {playlists.map((playlist) => (
                            <option key={playlist._id} value={playlist._id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={addToPlaylist}
                        className="mt-4 p-2 bg-red-500 rounded-md hover:bg-red-600 transition"
                    >
                        Add to Playlist
                    </button>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* ToastContainer for displaying notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
        </div>
    );
};

export default PlayerPage;
