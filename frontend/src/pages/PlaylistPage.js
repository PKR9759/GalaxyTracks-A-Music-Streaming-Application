import React, { useState, useEffect } from 'react';

// Dummy data to simulate API response
const dummyPlaylistData = {
    id: '1',
    name: 'Chill Vibes',
    user: 'DJ Relaxo',
    coverImage: 'https://via.placeholder.com/600x400', // Replace with actual image URL
    description: 'Perfect playlist to unwind and relax!',
    numberOfSongs: 20,
    songs: [
        {
            id: '1',
            title: 'Ocean Drive',
            artist: 'Duke Dumont',
            coverImage: 'https://via.placeholder.com/100x100', // Replace with actual image URL
            url: 'https://example.com/ocean-drive.mp3',
        },
        {
            id: '2',
            title: 'Sunflower',
            artist: 'Post Malone',
            coverImage: 'https://via.placeholder.com/100x100', // Replace with actual image URL
            url: 'https://example.com/sunflower.mp3',
        },
        // Add more dummy songs as needed
    ],
};

const PlaylistPage = () => {
    const [playlist, setPlaylist] = useState(null);

    // Simulate fetching data
    useEffect(() => {
        setPlaylist(dummyPlaylistData);
    }, []);

    if (!playlist) return <div className="text-white">Loading...</div>;

    return (
        <div className="bg-black min-h-screen p-4 text-white">
            {/* Header Section */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center bg-cover bg-center rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-transparent opacity-20"></div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10">{playlist.name}</h1>
                    <p className="text-lg md:text-xl mt-2 z-10">{playlist.user}</p>
                    <p className="text-md md:text-lg mt-1 z-10">Songs: {playlist.numberOfSongs}</p>
                </div>
            </div>

            {/* Songs List Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Songs</h2>
                <div className="space-y-2">
                    {playlist.songs.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center p-2 bg-black rounded-lg shadow-md transition-colors duration-200 hover:bg-gray-800 relative"
                        >
                            {/* Song Image */}
                            <div
                                className="w-16 h-16 bg-cover bg-center rounded-lg"
                                style={{ backgroundImage: `url(${song.coverImage})` }}
                            ></div>
                            {/* Song Details */}
                            <div className="ml-2">
                                <h3 className="text-lg font-semibold">{song.title}</h3>
                                <p className="text-sm text-gray-400">{song.artist}</p>
                            </div>
                            {/* Subtle Red Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-transparent opacity-5 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistPage;
