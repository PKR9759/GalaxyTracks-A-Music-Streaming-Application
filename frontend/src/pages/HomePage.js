import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { usePlayer } from '../contexts/PlayerContext';
import { FaEllipsisV } from 'react-icons/fa'; 

const HomePage = () => {
    const [latestSongs, setLatestSongs] = useState([]);
    const [error, setError] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [showMenuIndex, setShowMenuIndex] = useState(-1); 
    const { updateTrackList, playTrack } = usePlayer();

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/home`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                const { latestReleases } = response.data.data; // Only fetch latest releases
                setLatestSongs(latestReleases);
            } catch (err) {
                console.error('Error fetching home page data:', err);
                setError('Failed to load data');
            }
        };

        const fetchUserPlaylists = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/playlists/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlaylists(response.data.data);
            } catch (err) {
                console.error('Error fetching playlists:', err);
            }
        };

        fetchHomePageData();
        fetchUserPlaylists();
    }, []);

    const handlePlay = (songList, songIndex) => {
        const formattedTracks = songList.map(song => ({
            url: song.url,
            title: song.name,
            tags: [song.artist],
            image: song.image,
        }));
        updateTrackList(formattedTracks);
        playTrack(songIndex);
    };

    const handleAddToPlaylist = async (songId, playlistId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${BASE_URL}/api/playlists/${playlistId}/addSong`, {
                songId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Song added to playlist!');
        } catch (err) {
            console.error('Error adding song to playlist:', err);
            alert('Failed to add song to playlist.');
        }
    };

    const toggleMenu = (index) => {
        setShowMenuIndex(showMenuIndex === index ? -1 : index);
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col ">
            <Navbar />
            <div className="pt-10 px-4 space-y-10 mb-16"> {/* Make this area scrollable */}
                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Latest Songs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {latestSongs.map((song, index) => (
                            <div 
                                key={index} 
                                className="relative p-2 bg-gray-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-0 text-white"
                                style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }} 
                                onClick={() => handlePlay(latestSongs, index)}
                            >
                                <div className="relative block text-center">
                                    <div className="bg-gray-700 h-24 w-24 mb-2 rounded-md flex items-center justify-center mx-auto">
                                        <img src={song.image} alt={`${song.name} Album Art`} className="h-full w-full object-cover rounded-md" />
                                    </div>
                                    <p className="text-white text-sm">{song.name}</p>
                                    <p className="text-gray-300 text-xs">{song.artist}</p>
                                    <div className="absolute top-2 right-2">
                                        <button onClick={() => toggleMenu(index + 100)} className="focus:outline-none">
                                            <FaEllipsisV />
                                        </button>
                                        {showMenuIndex === index + 100 && (
                                            <div className="absolute right-0 bg-gray-800 rounded-md shadow-lg mt-1 z-10">
                                                <button 
                                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                                                    onClick={() => handleAddToPlaylist(song.id, playlists[0]?.id)}
                                                >
                                                    Add to Playlist
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
            <Footer /> {/* Footer at the bottom */}
        </div>
    );
};

export default HomePage;
