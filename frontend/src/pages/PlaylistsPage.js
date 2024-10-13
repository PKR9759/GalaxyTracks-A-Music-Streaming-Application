import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Assuming the Navbar is in the components folder
import { Link } from 'react-router-dom';

// Dummy data for testing
const trendingPlaylists = [
    { id: '1', name: 'Chill Vibes', user: 'DJ Relaxo', coverImage: 'https://via.placeholder.com/600x400' },
    { id: '2', name: 'Top Hits', user: 'Pop Master', coverImage: 'https://via.placeholder.com/600x400' },
    // Add more trending playlists as needed
];

const userPlaylists = [
    { id: '3', name: 'My Favorites', user: 'You', coverImage: 'https://via.placeholder.com/600x400' },
    { id: '4', name: 'Workout Jams', user: 'You', coverImage: 'https://via.placeholder.com/600x400' },
    // Add more user playlists as needed
];

const PlaylistsPage = () => {
    const [trending, setTrending] = useState([]);
    const [yourPlaylists, setYourPlaylists] = useState([]);

    // Simulate fetching data
    useEffect(() => {
        setTrending(trendingPlaylists);
        setYourPlaylists(userPlaylists);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-20 px-8 space-y-10">
                {/* Trending Playlists Section */}
                <section>
                    <h2 className="text-4xl font-bold mb-4 text-white">Trending Playlists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {trending.map((playlist) => (
                            <div 
                                key={playlist.id} 
                                className="relative p-4 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                                style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }} // Manual override for bg & border color
                            >
                                <Link 
                                    to={`/playlist/${playlist.id}`} 
                                    className="relative block text-center no-underline text-white hover:text-gray-300 focus:outline-none focus:ring-0"
                                    style={{ color: '#fff' }} // Manual override for text color
                                >
                                    <div className="bg-gray-700 h-32 mb-2 rounded-md flex items-center justify-center">
                                        <span className="text-gray-400">Playlist Cover</span>
                                    </div>
                                    <p className="text-white text-lg">{playlist.name}</p>
                                    <p className="text-gray-300 text-sm">{playlist.user}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Your Playlists Section */}
                <section>
                    <h2 className="text-4xl font-bold mb-4 text-white">Your Playlists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {yourPlaylists.map((playlist) => (
                            <div 
                                key={playlist.id} 
                                className="relative p-4 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                                style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }} // Manual override for bg & border color
                            >
                                <Link 
                                    to={`/playlist/${playlist.id}`} 
                                    className="relative block text-center no-underline text-white hover:text-gray-300 focus:outline-none focus:ring-0"
                                    style={{ color: '#fff' }} // Manual override for text color
                                >
                                    <div className="bg-gray-700 h-32 mb-2 rounded-md flex items-center justify-center">
                                        <span className="text-gray-400">Playlist Cover</span>
                                    </div>
                                    <p className="text-white text-lg">{playlist.name}</p>
                                    <p className="text-gray-300 text-sm">{playlist.user}</p>
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
