import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import { FaEllipsisV } from 'react-icons/fa'; // Importing a playlist icon from Material Design icons
import { usePlayer } from '../contexts/PlayerContext';


const SearchPage = () => {
    const [query, setQuery] = useState('');  // Search query
    const [songs, setSongs] = useState([]);  // Search results
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [page, setPage] = useState(1);  // Current page number (start from 1)
    const [hasMore, setHasMore] = useState(true);  // Check if more data is available
    const [isFetchingMore, setIsFetchingMore] = useState(false);  // Loading more state
    const { updateTrackList, playTrack } = usePlayer();
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

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
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
                        songs.map((song,index) => (
                            <div
                                key={song.id}
                                className="flex items-center p-3 bg-[#1F1F1F] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-102 hover:translate-x-4 cursor-pointer"
                                onClick={() => handlePlay(songs,index)}  // Redirect to player page with song ID
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
                                    <button className="absolute top-5 right-5 text-white hover:text-gray-400 focus:outline-none">
                                        <FaEllipsisV />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : !loading && !error && query.trim() ? (
                        <p className="text-gray-400">No songs found</p>
                    ) : null}
                </div>

                {/* Show loading when fetching more data */}
                {isFetchingMore && <p className="mt-4 text-lg">Loading more...</p>}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
