import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { usePlayer } from '../contexts/PlayerContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  
import { FaEllipsisV } from 'react-icons/fa'; 

const PlaylistPage = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { updateTrackList, playTrack } = usePlayer();

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
                    setPlaylist(response.data.playlist);
                } else {
                    // toast.error('Playlist not found.');
                    setPlaylist(null);
                }
            } catch (error) {
                // toast.error('Error fetching playlist: ' + (error.response?.data?.message || 'Server error'));
                setPlaylist(null);
            } finally {
                setLoading(false);
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
                    <div className="text-lg">Loading...</div>
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

    // Handle playing a song
    const handlePlay = (songList, songIndex) => {
        console.log(songList);
        const formattedTracks = songList.map(song => ({
            url: song.url,
            title: song.name,
            tags: [song.artist],
            image: song.image,
        }));
        updateTrackList(formattedTracks);
        playTrack(songIndex);
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
                            playlist.songs.map((song, index) => (
                                <div
                                    key={song.id}
                                    className="relative flex items-center p-3 bg-[#1F1F1F] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-102 hover:translate-x-4 cursor-pointer"
                                    onClick={() => handlePlay(playlist.songs, index)} // Use handlePlay on click
                                    style={{ maxWidth: '100%' }}
                                >
                                    {/* Display song image */}
                                    {song.image && (
                                        <img
                                            src={song.image}
                                            alt={song.title}
                                            className="w-14 h-14 rounded-lg mr-3 flex-shrink-0"
                                        />
                                    )}

                                    {/* Song details */}
                                    <div className="flex-1 overflow-hidden">
                                        <h3 className="text-lg font-semibold truncate">
                                            {song.name}
                                        </h3>
                                        <p className="text-gray-400 truncate">
                                            Artist: {song.artist || 'Unknown'}
                                        </p>
                                        <p className="text-gray-400">Duration: {Math.round(song.duration / 60)} mins</p>
                                    </div>

                                    {/* Button on the right-hand side */}
                                    <button className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white hover:text-gray-400 focus:outline-none">
                                        <FaEllipsisV />
                                    </button>
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
