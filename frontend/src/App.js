import React, { useState, useEffect } from 'react';
import { FaHeart, FaPlay, FaPause } from 'react-icons/fa';

// Dummy data to simulate API response
const dummyPlaylistData = {
    id: '1',
    name: 'Chill Vibes',
    user: 'DJ Relaxo',
    coverImage: 'https://via.placeholder.com/600x400', // Replace with actual image URL
    description: 'Perfect playlist to unwind and relax!',
    numberOfSongs: 20,
    likes: 530,
    followers: 1500,
    songs: [
        {
            id: '1',
            title: 'Ocean Drive',
            artist: 'Duke Dumont',
            coverImage: 'https://via.placeholder.com/150x150', // Replace with actual image URL
            url: 'https://example.com/ocean-drive.mp3',
            duration: '3:42',
        },
        {
            id: '2',
            title: 'Sunflower',
            artist: 'Post Malone',
            coverImage: 'https://via.placeholder.com/150x150', // Replace with actual image URL
            url: 'https://example.com/sunflower.mp3',
            duration: '2:38',
        },
        // Add more dummy songs as needed
    ],
};

const PlaylistPage = () => {
    const [playlist, setPlaylist] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);

    // Simulate fetching data
    useEffect(() => {
        // Normally, you'd fetch this data from an API
        setPlaylist(dummyPlaylistData);
    }, []);

    if (!playlist) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="bg-black min-h-screen p-8 text-white">
            {/* Header Section */}
            <div className="relative w-full h-80 lg:h-[400px] flex items-center justify-center bg-cover bg-center rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${playlist.coverImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-transparent to-black flex flex-col items-center justify-center p-8 lg:p-16 text-center rounded-lg border-4 border-red-700 shadow-2xl">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-md glow-red">{playlist.name}</h1>
                    <p className="text-lg lg:text-2xl mt-2 text-gray-300">{playlist.user}</p>
                    <p className="mt-1 text-md lg:text-lg text-red-400">{playlist.numberOfSongs} Songs • {playlist.followers} Followers • <FaHeart className="inline text-red-500" /> {playlist.likes}</p>
                    <p className="mt-3 text-sm lg:text-md max-w-lg text-gray-200 italic">{playlist.description}</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Songs List Section */}
            <div className="mt-12 px-4 lg:px-16">
                <h2 className="text-3xl font-bold mb-6 border-b border-red-700 pb-2 text-red-500">Songs</h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {playlist.songs.map((song, index) => (
                        <div
                            key={song.id}
                            className={`flex items-center p-4 rounded-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 ${currentSong?.id === song.id ? 'bg-red-900' : 'bg-gray-900'} cursor-pointer hover:bg-red-800`}
                            onClick={() => setCurrentSong(song)}
                        >
                            {/* Song Image */}
                            <div
                                className="w-20 h-20 bg-cover bg-center rounded-lg flex-shrink-0 border-2 border-red-700"
                                style={{ backgroundImage: `url(${song.coverImage})` }}
                            ></div>
                            {/* Song Details */}
                            <div className="ml-4 flex-grow">
                                <h3 className="text-lg lg:text-xl font-semibold text-white">{song.title}</h3>
                                <p className="text-sm lg:text-md text-gray-400">{song.artist}</p>
                            </div>
                            {/* Duration and Play Button */}
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-300">{song.duration}</span>
                                <button className="p-2 bg-red-600 hover:bg-red-500 rounded-full text-white shadow-md">
                                    {currentSong?.id === song.id ? <FaPause /> : <FaPlay />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistPage;
