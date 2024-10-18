import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import { usePlayer } from '../contexts/PlayerContext';
import { FaList, FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const SearchPage = () => {
    const [query, setQuery] = useState('');  // Search query
    const [songs, setSongs] = useState([]);  // Search results
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [page, setPage] = useState(1);  // Current page number (start from 1)
    const [hasMore, setHasMore] = useState(true);  // Check if more data is available
    const [isFetchingMore, setIsFetchingMore] = useState(false);  // Loading more state
    const { updateTrackList, playTrack } = usePlayer();
    const [showMenuIndex, setShowMenuIndex] = useState(-1);
    const [playlists, setPlaylists] = useState([]);

    // Reset songs and pagination when query changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const trimmedQuery = query.trim();
            
            if (trimmedQuery) {
                setSongs([]); // Clear previous search results
                setPage(1); // Reset to the first page (start from page 1)
                setHasMore(true); // Reset pagination availability
                searchSongs(trimmedQuery, 1); // Trigger search on query change (start at page 1)
            } else {
                setSongs([]); // Clear results if input is empty
                setHasMore(false); // Stop fetching more when input is cleared
                setError(null); // Clear any error messages
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout on unmount or new keystroke
    }, [query]);

    useEffect(()=>{
        const fetchUserPlaylists = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/playlists/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlaylists(response.data.playlists);
            } catch (err) {
                console.error('Error fetching playlists:', err);
            }
        };

        fetchUserPlaylists();
    },[])

    // Fetch songs based on query and page number
    const searchSongs = async (searchQuery, pageNumber) => {
        if (loading || !searchQuery.trim()) return;  // Prevent duplicate requests or empty queries

        setLoading(true);  // Set loading to true before fetching data
        setError(null);  // Clear any previous errors

        try {
            const response = await axios.get(`${BASE_URL}/search/${searchQuery}`, {
                params: { page: pageNumber }
            });

            if (response.data.success) {
                if (pageNumber === 1) {  // First page
                    setSongs(response.data.songs);  // Set new songs for the first page
                } else {
                    setSongs(prevSongs => [...prevSongs, ...response.data.songs]);  // Append songs for subsequent pages
                }

                // If no more songs are returned, set hasMore to false
                if (response.data.songs.length === 0) {
                    setHasMore(false);
                }
            } else {
                setError('No songs found');
                setHasMore(false);
            }
        } catch (err) {
            setError('Error searching for songs');
        } finally {
            setLoading(false);  // Reset loading state
            setIsFetchingMore(false);  // Reset the "fetching more" state
        }
    };

    const handlePlay = (songList, songIndex) => {
        console.log(songList);
        const formattedTracks = songList.map(song => ({
            url: song.url,
            title: song.name,
            tags: [song.artist],
            image: song.image,
        }));
        updateTrackList(formattedTracks);
        playTrack(songIndex);
    };

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.scrollHeight &&
                hasMore &&
                !isFetchingMore
            ) {
                setIsFetchingMore(true);
                // Use the previous value to increment the page
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);  // Cleanup on unmount
    }, [hasMore, isFetchingMore]);

    // Fetch songs for the next page when page changes
    useEffect(() => {
        if (page > 1 && query.trim()) {  // Fetch only if page > 1 to avoid duplicate fetch for page 1
            searchSongs(query, page);  // Fetch results for the current page
        }
    }, [page]);

    const handleAddToPlaylist = async (songId, playlistId) => {
        const token = localStorage.getItem('token');
        console.log(songId, playlistId);
        try {
            await axios.post(`${BASE_URL}/playlists/${playlistId}/addSong/${songId}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Song added to playlist!');
        } catch (err) {
            console.error('Error adding song to playlist:', err);
            toast.error('Failed to add song to playlist.');
        }
    };

    const toggleMenu = (index) => {
        setShowMenuIndex(showMenuIndex === index ? -1 : index);
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col relative"> {/* Added z-10 here */}
            <Navbar />
            <div className="pt-24 pb-16 px-4"> {/* Adjusted top padding */}
                <h1 className="text-3xl font-bold mb-6">Search for Songs</h1>

                {/* Search input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query on input change
                    placeholder="Search for songs..."
                    className="p-2 rounded-md bg-black text-white w-full border"
                />

                {/* Loading indicator */}
                {loading && page === 1 && <p className="mt-4 text-lg">Loading...</p>} {/* Show loading only for the first page */}

                {/* Error state */}
                {error && <p className="mt-4 text-red-500">{error}</p>}

                {/* Display search results */}
                <div className="space-y-4 mt-6">
                    {songs.length > 0 ? (
                        songs.map((song, index) => (
                            <div
                                key={song.id}
                                className="flex items-center p-3 bg-[#1F1F1F] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-102 hover:translate-x-3 cursor-pointer"
                                onClick={() => handlePlay(songs, index)}  // Play the selected song
                            >
                                {/* Song image */}
                                <img
                                    src={song.image}
                                    alt={song.name}
                                    className="w-14 h-14 rounded-lg mr-4"
                                />

                                {/* Song details */}
                                <div>
                                    <h3 className="text-lg font-semibold">{song.name}</h3>
                                    <p className="text-gray-400">Artist: {song.artist}</p>
                                    <p className="text-gray-400">Album: {song.album}</p>
                                    
                                    {/* Add to playlist button */}
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation(); // Prevents song from playing
                                            toggleMenu(index);
                                        }}
                                        className="absolute top-5 right-5 text-white hover:text-gray-400 focus:outline-none flex items-center bg-gray-700 hover:bg-gray-600 rounded-md p-1" // Adjusted z-index
                                    >
                                        <FaList className="mr-1 text-white text-sm" />
                                        <FaPlus className="text-white text-sm" />
                                    </button>

                                    {/* Playlist options dropdown */}
                                    
                                </div>
                                {showMenuIndex === index && (
                                        <div className="absolute right-20 bg-gray-800 rounded-md shadow-lg mt-2 w-48 p-2"
                                            style={{ border: '1px solid #444', backgroundColor: '#1f1f1f' }}>
                                            <ul className="z-50">
                                                {playlists.map((playlist) => (
                                                    <li key={playlist.id}>
                                                        <button
                                                            className="block w-full px-4 py-2 text-sm text-white bg-black-700 hover:bg-gray-700 rounded-md focus:outline-none"
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                handleAddToPlaylist(song.id, playlist.id);
                                                            }}
                                                        >
                                                            {playlist.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}


                            </div>
                            
                        ))
                    ) : (
                        <p className="mt-4 text-lg">No songs found</p>
                    )}

                    {/* Loading indicator for pagination */}
                    {isFetchingMore && <p className="mt-4 text-lg">Loading more songs...</p>}
                </div>
            </div>

            <Footer /> {/* Footer component */}
            <ToastContainer /> {/* Toast notifications */}
        </div>
    );
};

export default SearchPage;
