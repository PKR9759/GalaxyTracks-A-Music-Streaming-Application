import React, { useEffect, useState, useRef } from 'react';

// Dummy data for song clips
const dummyClips = [
    {
        id: '1',
        title: 'Ocean Drive',
        artist: 'Duke Dumont',
        lyrics: 'In the night, there’s a light...',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        visual: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Ocean+Drive',
    },
    {
        id: '2',
        title: 'Sunflower',
        artist: 'Post Malone',
        lyrics: 'You’re a sunflower...',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        visual: 'https://via.placeholder.com/600x400/FFC300/FFFFFF?text=Sunflower',
    },
    {
        id: '3',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        lyrics: 'I said, ooh, I’m blinded by the lights...',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        visual: 'https://via.placeholder.com/600x400/DAF7A6/FFFFFF?text=Blinding+Lights',
    },
    {
        id: '4',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        lyrics: 'I’m in love with the shape of you...',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        visual: 'https://via.placeholder.com/600x400/C70039/FFFFFF?text=Shape+of+You',
    },
];

const Sparks = () => {
    const [currentClip, setCurrentClip] = useState(dummyClips[0]);
    const [prevClip, setPrevClip] = useState(null);
    const audioRef = useRef(null);
    const [isAudioReady, setIsAudioReady] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false); // Track user interaction

    const playClip = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pauseClip = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const getRandomClip = () => {
        const randomIndex = Math.floor(Math.random() * dummyClips.length);
        return dummyClips[randomIndex];
    };

    const nextClip = () => {
        const newClip = getRandomClip();
        setPrevClip(currentClip); // Store previous clip for animation
        setCurrentClip(newClip);
        if (isUserInteracted) { // Only change source if user has interacted
            audioRef.current.src = newClip.url; // Update source for audio
            playClip(); // Play immediately after changing source
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            if (!isUserInteracted) {
                setIsUserInteracted(true); // Mark user as interacted
                audioRef.current.src = currentClip.url; // Set audio source on first interaction
                playClip(); // Start playing
            }
            nextClip();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        // Set the audio source and update ready state
        if (audioRef.current) {
            audioRef.current.src = currentClip.url;
            audioRef.current.load();
            audioRef.current.oncanplay = () => {
                setIsAudioReady(true); // Audio is ready to play
            };
            audioRef.current.onended = nextClip; // Go to next clip when current ends
        }
    }, [currentClip]);

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className={`flex flex-col items-center justify-center w-full h-full relative transition-transform duration-300 ease-in-out ${prevClip ? 'transform -translate-y-12' : ''}`}>
                {prevClip && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out">
                        <img
                            src={prevClip.visual}
                            alt={`${prevClip.title} visual`}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg border-4 border-red-600"
                            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))' }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-6">
                            <h3 className="text-4xl font-bold text-white">{prevClip.title}</h3>
                            <p className="text-lg text-gray-300">{prevClip.artist}</p>
                            <p className="text-sm text-gray-400 mt-1">{prevClip.lyrics}</p>
                        </div>
                    </div>
                )}
                <div className="w-full h-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                    <img
                        src={currentClip.visual}
                        alt={`${currentClip.title} visual`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg border-4 border-red-600"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-6">
                        <h3 className="text-4xl font-bold text-white">{currentClip.title}</h3>
                        <p className="text-lg text-gray-300">{currentClip.artist}</p>
                        <p className="text-sm text-gray-400 mt-1">{currentClip.lyrics}</p>
                        <audio ref={audioRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sparks;
