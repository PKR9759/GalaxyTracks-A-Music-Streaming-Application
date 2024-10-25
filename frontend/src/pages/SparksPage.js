import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const SparksPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [sparks, setSparks] = useState([]);
    const [currentSparkIndex, setCurrentSparkIndex] = useState(0);
    const [audio] = useState(new Audio()); // Initialize audio object

    const fetchSpark = async () => {
        try {
            const response = await fetch('/api/sparks/stream'); // Request without specific URL
            if (response.ok) {
                const sparkUrl = response.url; // URL from the backend
                console.log("Fetched Spark URL:", sparkUrl); // Log the URL
                setSparks((prevSparks) => [...prevSparks, sparkUrl]); // Append to sparks list
                setCurrentSparkIndex(sparks.length); // Update index to newly added spark
                playSpark(sparkUrl); // Play the new spark directly
            } else {
                console.error("Failed to fetch spark:", response.statusText);
            }
        } catch (error) {
            console.error('Error fetching spark:', error);
        }
    };

    const playSpark = (url) => {
        audio.src = url; // Set audio source
        audio.play()
            .then(() => {
                setIsPlaying(true);
                showPlayPauseIcon();
            })
            .catch((err) => console.error("Error playing audio:", err));
    };

    const showPlayPauseIcon = () => {
        setShowIcon(true);
        setTimeout(() => setShowIcon(false), 1000); // Icon visible for 1 sec
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            fetchSpark(); // Fetch a new spark on down arrow key
        } else if (e.key === 'ArrowUp') {
            if (currentSparkIndex > 0) {
                setCurrentSparkIndex(currentSparkIndex - 1); // Go to previous spark
                playSpark(sparks[currentSparkIndex - 1]); // Play previous spark
            }
        }
    };

    useEffect(() => {
        fetchSpark(); // Fetch the first spark when the component mounts
        window.addEventListener('keydown', handleKeyDown); // Listen for keydown events

        return () => {
            window.removeEventListener('keydown', handleKeyDown); // Clean up event listener
            audio.pause(); // Pause audio when component unmounts
        };
    }, []);

    return (
        <div className="bg-black min-h-screen flex items-center justify-center overflow-hidden">
            {/* Sparks Box */}
            <div
                onClick={() => {
                    if (isPlaying) {
                        audio.pause();
                    } else {
                        playSpark(sparks[currentSparkIndex]);
                    }
                    setIsPlaying(!isPlaying);
                }}
                className="relative w-[90vw] max-w-[540px] h-[90vh] bg-gray-900 rounded-md overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: '9/16' }}
            >
                {/* Spark Title at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-center text-white text-lg font-semibold truncate">
                    {sparks[currentSparkIndex] ? `Playing Spark ${currentSparkIndex + 1}` : 'Loading...'}
                </div>

                {/* Play/Pause Icon */}
                {showIcon && (
                    <div className="absolute text-white text-6xl flex items-center justify-center">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SparksPage;
