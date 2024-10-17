import React, { useState, useEffect } from 'react';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For accessing the songId
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BASE_URL from '../apiConfig';

const PlayerPage = () => {
    const { songId } = useParams();  // Extract songId from URL
    const [song, setSong] = useState(null);  // Store song details
    const [error, setError] = useState(null);  // Error handling

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/song/${songId}`);
                
                if (response.data.success) {
                    const fetchedSong = response.data.song;
                    // Check if the URL is valid
                    if (fetchedSong.url) {
                        setSong({
                            url: fetchedSong.url,
                            title: fetchedSong.name,
                            tags: [fetchedSong.language],  // Language as a tag
                        });
                    } else {
                        setError("Audio URL is missing or invalid.");
                    }
                } else {
                    setError("Failed to fetch song details.");
                }
            } catch (err) {
                setError("Error fetching song details: " + err.message);
            }
        };

        fetchSongDetails();
    }, [songId]);

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="pt-24 pb-16 px-4 flex flex-col items-center">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : song ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6">{song.title}</h1>
                        <img src={song.image || "/default-image.jpg"} alt={song.title} className="w-1/2 mb-4" />
                        
                        {/* Audio Player */}
                        <Player trackList={[song]} />
                    </>
                ) : (
                    <p>Loading song details...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PlayerPage;
