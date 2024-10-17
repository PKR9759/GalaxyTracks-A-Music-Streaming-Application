import React, { createContext, useState, useContext } from 'react';

// Create the context
const PlayerContext = createContext();

export const usePlayer = () => {
    return useContext(PlayerContext);
};

// Provider component
export const PlayerProvider = ({ children }) => {
    const [trackList, setTrackList] = useState([]);  // To hold the list of songs
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);  // No song selected initially
    const [isPlaying, setIsPlaying] = useState(false);  // Play/pause state

    // Function to update the track list
    const updateTrackList = (newTrackList) => {
        setTrackList(newTrackList);
        setCurrentTrackIndex(0); // Default to play the first song in the list
    };

    // Function to play a specific track by index
    const playTrack = (trackIndex) => {
        setCurrentTrackIndex(trackIndex);
        setIsPlaying(true);  // Play the track
    };

    // Function to pause
    const pauseTrack = () => {
        setIsPlaying(false);  // Pause the track
    };

    return (
        <PlayerContext.Provider
            value={{
                trackList,
                currentTrackIndex,
                isPlaying,
                updateTrackList,
                playTrack,
                pauseTrack,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};