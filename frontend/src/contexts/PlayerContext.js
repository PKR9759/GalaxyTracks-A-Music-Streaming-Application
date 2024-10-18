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
        setIsPlaying(true); // Start playing automatically when new songs are added
    };

    // Play the selected track
    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    // Pause the currently playing track
    const pauseTrack = () => {
        setIsPlaying(false);
    };

    // Play the next track
    const nextTrack = () => {
        if (currentTrackIndex < trackList.length - 1) {
            playTrack(currentTrackIndex + 1);
        }
    };

    // Play the previous track
    const prevTrack = () => {
        if (currentTrackIndex > 0) {
            playTrack(currentTrackIndex - 1);
        }
    };

    // Update the current track index
    const updateCurrentTrackIndex = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    

    return (
        <PlayerContext.Provider value={{
            trackList,
            currentTrackIndex,
            isPlaying,
            updateTrackList,
            playTrack,
            pauseTrack,
            nextTrack,
            prevTrack,
            updateCurrentTrackIndex,
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
