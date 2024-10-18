import React, { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { 
    FaPlay, 
    FaPause, 
    FaStepBackward, 
    FaStepForward, 
    FaVolumeUp, 
    FaVolumeDown, 
    FaVolumeMute, 
    FaTimes  
} from 'react-icons/fa';

const AudioPlayer = () => {
    const { trackList, currentTrackIndex, isPlaying, playTrack, pauseTrack, nextTrack, prevTrack, updateCurrentTrackIndex } = usePlayer();
    const [volume, setVolume] = useState(1.0);
    const [progress, setProgress] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const audioRef = useRef(null);

    const currentTrack = trackList[currentTrackIndex] || {};

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : newVolume;
        }
    };

    // Mute/unmute audio
    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? volume : 0;
        }
    };

    // Handle progress change by clicking on the progress bar
    const handleProgressChange = (e) => {
        if (audioRef.current && audioRef.current.duration) {
            const progressBar = e.target;
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const progressBarWidth = progressBar.clientWidth;
            const newTime = (clickPosition / progressBarWidth) * audioRef.current.duration;

            audioRef.current.currentTime = newTime;
            setProgress((newTime / audioRef.current.duration) * 100);
            setIsSeeking(false);
        }
    };

    // Update progress and handle song end
    const updateProgress = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const progressPercentage = (currentTime / duration) * 100;
            setProgress(progressPercentage);
        }
    };

    // Play track and update track index
    const handlePlayTrack = (index) => {
        updateCurrentTrackIndex(index);
        playTrack(index);
    };

   

    // Function to open the player
    const handleOpenPlayer = () => {
        setIsVisible(true);
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume; // Set volume when opening
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
            isPlaying ? audioRef.current.play() : audioRef.current.pause();

            const onEnded = () => {
                nextTrack();
            };

            audioRef.current.addEventListener('ended', onEnded);

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('ended', onEnded);
                }
            };
        }
    }, [isPlaying, currentTrackIndex, volume, isMuted, nextTrack]);

    useEffect(() => {
        const intervalId = setInterval(updateProgress, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (!isVisible || !trackList.length) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-black border-t-2 border-gray-700 shadow-lg z-50">
            
            {/* Progress Bar */}
            <div 
                className="mt-2 h-2 bg-gray-700 rounded-full cursor-pointer"
                onClick={handleProgressChange}
                style={{ padding: '0 10px' }}
            >
                <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${progress}% `}}
                />
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-sm text-gray-400">
                <span>{currentTrack && audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
                <span>{currentTrack && audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}</span>
            </div>

            <div className="flex items-center justify-between text-white mt-2">
                {/* Track Info */}
                <div className="flex items-center space-x-4 w-1/3">
                    <img
                        src={currentTrack?.image || 'default-image.jpg'}
                        alt={currentTrack?.title || 'No Track'}
                        className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="text-left">
                        <p className="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
                            {currentTrack?.title || 'No Track Playing'}
                        </p>
                        <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
                            {currentTrack?.tags?.[0] || 'Unknown Artist'}
                        </p>
                    </div>
                </div>

                {/* Audio Controls */}
                <div className="flex flex-col items-center space-y-2 w-1/3">
                    <div className="flex items-center space-x-6">
                        {/* Previous Track */}
                        <button
                            className="text-white p-2 rounded-full hover:bg-gray-800 transition"
                            onClick={prevTrack}
                            disabled={currentTrackIndex === 0}
                        >
                            <FaStepBackward size={24} />
                        </button>

                        {/* Play / Pause */}
                        <button
                            className="text-white p-4 bg-gray-800 rounded-full hover:bg-gray-900 transition"
                            onClick={isPlaying ? pauseTrack : () => handlePlayTrack(currentTrackIndex)}
                        >
                            {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
                        </button>

                        {/* Next Track */}
                        <button
                            className="text-white p-2 rounded-full hover:bg-gray-800 transition"
                            onClick={nextTrack}
                            disabled={currentTrackIndex === trackList.length - 1}
                        >
                            <FaStepForward size={24} />
                        </button>
                    </div>
                </div>

                {/* Volume Control */}
                <div className="w-1/3 flex items-center justify-end space-x-2">
                    {volume > 0.7 && <FaVolumeUp />}
                    {volume > 0 && volume <= 0.7 && <FaVolumeDown />}
                    {volume === 0 && <FaVolumeMute />}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-gray-400 rounded-full"
                    />
                    <button onClick={toggleMute} className="text-white">
                        {isMuted ? <FaVolumeMute size={24} /> : (volume > 0.7 ? <FaVolumeUp size={24} /> : <FaVolumeDown size={24} />)}
                    </button>
                </div>
            </div>

            <audio ref={audioRef} src={currentTrack?.url || ''} />
        </div>
    );
};

// Helper function to format time
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default AudioPlayer;