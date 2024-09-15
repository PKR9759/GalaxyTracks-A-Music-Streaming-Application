import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../apiConfig'; // Your base URL for API
import SongCard from '../components/SongCard'; // Assuming you have a SongCard component

const Home = () => {
    const [recentSongs, setRecentSongs] = useState([]);
    const [latestSongs, setLatestSongs] = useState([]);

    useEffect(() => {
        
        axios.get(`${BASE_URL}/songs/recently-played`)
            .then((response) => setRecentSongs(response.data))
            .catch((error) => console.error('Error fetching recent songs:', error));

        
        axios.get(`${BASE_URL}/songs/latest`)
            .then((response) => setLatestSongs(response.data))
            .catch((error) => console.error('Error fetching latest songs:', error));
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6">Recently Played</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recentSongs.map(song => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6">Latest Songs</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {latestSongs.map(song => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
