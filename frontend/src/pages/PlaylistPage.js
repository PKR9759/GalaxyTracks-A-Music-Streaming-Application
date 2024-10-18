import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEllipsisV } from 'react-icons/fa'; 
import { usePlayer } from '../contexts/PlayerContext'; // Import usePlayer

const PlaylistPage = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const { updateTrackList, playTrack } = usePlayer(); // Destructure from usePlayer
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/playlists/${playlistId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    setPlaylist(response.data.playlist);
                } else {
                    toast.error('Playlist not found.');
                    setPlaylist(null);
                }
            } catch (error) {
                toast.error('Error fetching playlist: ' + (error.response?.data?.message || 'Server error'));
                setPlaylist(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [playlistId]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white">
                <Navbar />
                <div className="pt-16 pb-16 flex justify-center items-center">
                    <div className="text-lg">Loading...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!playlist) return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="pt-16 pb-16">
                <div className="p-4">Playlist not found</div>
            </div>
            <Footer />
        </div>
    );

    const handlePlaySong = (song) => {
        const formattedTracks = playlist.songs.map(song => ({
            url: song.url,
            title: song.name,
            tags: [song.artist],
            image: song.image,
        }));
        updateTrackList(formattedTracks);
        playTrack(playlist.songs.indexOf(song)); // Pass the index of the song
    };

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">
            <Navbar />
            <div className="pt-16 pb-16">
                {/* Playlist Header */}
                <div
                    className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center bg-cover bg-center rounded-lg overflow-hidden"
                    style={{
                        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAx3uMZCeAM9oi7493737U-bSOgBlqGI-eBg&s')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 z-0">
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
                                    key={song.id}
                                    className="relative flex items-center p-3 bg-[#1F1F1F] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-102 hover:translate-x-4 cursor-pointer"
                                    onClick={() => handlePlaySong(song)} // Updated to handlePlaySong
                                >
                                    <div className="relative block text-center">
                                        <div className="bg-gray-700 h-24 w-24 mb-2 rounded-md flex items-center justify-center mx-auto">
                                            <img src={song.image} alt={`${song.name} Album Art`} className="h-full w-full object-cover rounded-md" />
                                        </div>
                                        <p className="text-white text-sm">{song.name}</p>
                                        <p className="text-gray-300 text-xs">{song.artist}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No songs available in this playlist.</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PlaylistPage;
