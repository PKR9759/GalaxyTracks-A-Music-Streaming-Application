import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Updated path for Navbar component
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [history, setHistory] = useState([]);
    const [latestSongs, setLatestSongs] = useState([]);
    const [trendingSongs, setTrendingSongs] = useState([]);

    // Fetch dummy data for testing
    useEffect(() => {
        const dummyHistory = [
            { songId: '1', title: 'Shape of You', artist: 'Ed Sheeran', playedAt: '2023-09-10' },
            { songId: '2', title: 'Blinding Lights', artist: 'The Weeknd', playedAt: '2023-09-12' },
            { songId: '3', title: 'Levitating', artist: 'Dua Lipa', playedAt: '2023-09-14' },
        ];

        const dummyLatestSongs = [
            { id: '101', title: 'Montero', artist: 'Lil Nas X' },
            { id: '102', title: 'Industry Baby', artist: 'Lil Nas X & Jack Harlow' },
            { id: '103', title: 'Peaches', artist: 'Justin Bieber' },
        ];

        const dummyTrendingSongs = [
            { id: '201', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber' },
            { id: '202', title: 'Butter', artist: 'BTS' },
            { id: '203', title: 'Good 4 U', artist: 'Olivia Rodrigo' },
        ];

        // Set dummy data
        setHistory(dummyHistory);
        setLatestSongs(dummyLatestSongs);
        setTrendingSongs(dummyTrendingSongs);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-20 px-8 space-y-10">
                {/* Recently Played Section */}
                <section>
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Recently Played</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {history.map((song, index) => (
                            <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition">
                                <Link to={`/song/${song.songId}`} className="block text-center no-underline hover:no-underline">
                                    {/* Placeholder for Album Art */}
                                    <div className="bg-gray-800 h-32 mb-2 rounded-md"></div>
                                    <p className="text-white text-lg">{song.title}</p>
                                    <p className="text-gray-400 text-sm">{song.artist}</p>
                                    <p className="text-gray-500 text-xs">Played At: {new Date(song.playedAt).toLocaleString()}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Latest Songs Section */}
                <section>
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Latest Songs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {latestSongs.map((song, index) => (
                            <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition">
                                <Link to={`/song/${song.id}`} className="block text-center no-underline hover:no-underline">
                                    <div className="bg-gray-800 h-32 mb-2 rounded-md"></div>
                                    <p className="text-white text-lg">{song.title}</p>
                                    <p className="text-gray-400 text-sm">{song.artist}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trending Songs Section */}
                <section>
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Trending Songs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {trendingSongs.map((song, index) => (
                            <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition">
                                <Link to={`/song/${song.id}`} className="block text-center no-underline hover:no-underline">
                                    <div className="bg-gray-800 h-32 mb-2 rounded-md"></div>
                                    <p className="text-white text-lg">{song.title}</p>
                                    <p className="text-gray-400 text-sm">{song.artist}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
